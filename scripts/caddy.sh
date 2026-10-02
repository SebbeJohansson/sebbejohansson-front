#!/usr/bin/env bash
# Serves the Nuxt dev server at https://local.sebbejohansson.com so the Storyblok
# visual editor (which only accepts https preview URLs) can load it.
#
# Everything is idempotent; each step is skipped when it is already done:
#   1. Download Caddy to ~/.local/bin (no apt package, so no system service on :80/:443)
#   2. Let Caddy bind :443 without root (setcap, needs sudo once)
#   3. Point the domain at this machine in the WSL and Windows hosts files
#   4. Start `nuxt dev` if nothing is listening on :3000 yet
#   5. Start Caddy and trust its local root CA in the Windows certificate store
set -euo pipefail

DOMAIN=local.sebbejohansson.com
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CADDY="$HOME/.local/bin/caddy"
CADDY_ROOT_CERT="${XDG_DATA_HOME:-$HOME/.local/share}/caddy/pki/authorities/local/root.crt"

log() { printf '\033[36m[caddy]\033[0m %s\n' "$*"; }

is_wsl() { grep -qi microsoft /proc/version 2>/dev/null; }

# Runs a PowerShell script on the Windows host. Encoded so no quoting survives the hop.
powershell() {
  local encoded
  encoded="$(printf '$ProgressPreference="SilentlyContinue"; %s' "$1" | iconv -t UTF-16LE | base64 -w0)"
  powershell.exe -NoProfile -NonInteractive -EncodedCommand "$encoded" | tr -d '\r'
}

# Same, but elevated: shows a single UAC prompt and waits for it to finish.
powershell_admin() {
  local encoded
  encoded="$(printf '$ProgressPreference="SilentlyContinue"; %s' "$1" | iconv -t UTF-16LE | base64 -w0)"
  powershell "Start-Process powershell -Verb RunAs -Wait -WindowStyle Hidden -ArgumentList '-NoProfile','-EncodedCommand','$encoded'"
}

install_caddy() {
  if [[ -x "$CADDY" ]]; then return; fi
  local arch
  case "$(uname -m)" in
    x86_64) arch=amd64 ;;
    aarch64 | arm64) arch=arm64 ;;
    *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
  esac
  log "Downloading Caddy to $CADDY"
  mkdir -p "$(dirname "$CADDY")"
  curl -fsSL "https://caddyserver.com/api/download?os=linux&arch=$arch" -o "$CADDY.tmp"
  chmod +x "$CADDY.tmp"
  mv "$CADDY.tmp" "$CADDY"
}

allow_port_443() {
  if getcap "$CADDY" | grep -q cap_net_bind_service; then return; fi
  log "Allowing Caddy to bind port 443 (sudo)"
  sudo setcap cap_net_bind_service=+ep "$CADDY"
}

add_hosts_entries() {
  if ! grep -qE "^[^#]*[[:space:]]$DOMAIN([[:space:]]|$)" /etc/hosts; then
    log "Adding $DOMAIN to /etc/hosts (sudo)"
    printf '127.0.0.1 %s\n' "$DOMAIN" | sudo tee -a /etc/hosts >/dev/null
  fi

  is_wsl || return 0
  # WSL's NAT mode does not reliably forward Windows' 127.0.0.1 into the VM, so
  # Windows resolves the domain straight to the WSL IP. That IP changes between
  # reboots, so the entry is rewritten whenever it is stale.
  local wsl_ip win_hosts=/mnt/c/Windows/System32/drivers/etc/hosts
  wsl_ip="$(hostname -I | awk '{print $1}')"
  if ! grep -qE "^$wsl_ip[[:space:]]+$DOMAIN([[:space:]]|$)" "$win_hosts"; then
    log "Pointing $DOMAIN at $wsl_ip in the Windows hosts file (accept the UAC prompt)"
    powershell_admin "\$path = \"\$env:SystemRoot\\System32\\drivers\\etc\\hosts\"; \$lines = @(Get-Content \$path | Where-Object { \$_ -notmatch '\\s$DOMAIN(\\s|\$)' }); Set-Content -Path \$path -Encoding ASCII -Value (\$lines + '$wsl_ip $DOMAIN')"
  fi
}

start_nuxt_dev() {
  if (exec 3<>/dev/tcp/127.0.0.1/3000) 2>/dev/null; then
    log "Dev server already running on :3000"
    return
  fi
  log "Starting nuxt dev"
  (cd "$ROOT_DIR" && yarn dev) &
  NUXT_PID=$!
}

trust_root_cert_on_windows() {
  is_wsl || return 0

  # Caddy creates its local CA on first start.
  for _ in $(seq 1 50); do
    [[ -f "$CADDY_ROOT_CERT" ]] && break
    sleep 0.2
  done
  if [[ ! -f "$CADDY_ROOT_CERT" ]]; then
    log "Caddy root certificate not found at $CADDY_ROOT_CERT, skipping Windows trust"
    return
  fi

  local thumbprint
  thumbprint="$(openssl x509 -in "$CADDY_ROOT_CERT" -noout -fingerprint -sha1 | cut -d= -f2 | tr -d :)"
  if [[ "$(powershell "Test-Path Cert:\\LocalMachine\\Root\\$thumbprint" 2>/dev/null | tail -n1)" == "True" ]]; then return; fi

  # LocalMachine needs elevation but, unlike CurrentUser, adds the cert without a
  # confirmation dialog. The cert is inlined so the elevated shell needs no WSL path.
  log "Trusting Caddy's root certificate in Windows (accept the UAC prompt, then restart the browser)"
  local der_base64
  der_base64="$(openssl x509 -in "$CADDY_ROOT_CERT" -outform der | base64 -w0)"
  powershell_admin "\$store = New-Object System.Security.Cryptography.X509Certificates.X509Store('Root', 'LocalMachine'); \$store.Open('ReadWrite'); \$store.Add([System.Security.Cryptography.X509Certificates.X509Certificate2]::new([Convert]::FromBase64String('$der_base64'))); \$store.Close()"
}

cleanup() {
  [[ -n "${CADDY_PID:-}" ]] && kill "$CADDY_PID" 2>/dev/null || true
  [[ -n "${NUXT_PID:-}" ]] && kill "$NUXT_PID" 2>/dev/null || true
}

install_caddy
allow_port_443
add_hosts_entries
trap cleanup EXIT INT TERM
start_nuxt_dev

"$CADDY" run --config "$ROOT_DIR/Caddyfile" --adapter caddyfile &
CADDY_PID=$!
sleep 1
if ! kill -0 "$CADDY_PID" 2>/dev/null; then
  log "Caddy failed to start (is something else using port 443?)"
  exit 1
fi
trust_root_cert_on_windows

log "Ready: https://$DOMAIN (set this as the Storyblok preview URL)"
wait "$CADDY_PID"
