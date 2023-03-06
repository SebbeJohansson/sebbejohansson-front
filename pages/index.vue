<script setup lang="ts">
  definePageMeta({
    layout: 'blank',
  });
  useHead({
    title: 'SebbeJohansson',
    meta: [{
      vmid: 'description',
      name: 'description',
      content: 'Full-stack software engineer focusing on Web and Games.',
    }],
  });
</script>

<template>
  <div class="page index">
    <div class="index__hero">
      <content-with-title title="🐉 Sebastian &quot;Dragon&quot; Johansson 🐉">
        <div>
          <div class="index__hero-content">
            <h3>Developer and Mentor</h3>
            <i>storyblok and nuxt fanatic</i>
            <p>After working as a developer for many years I have many times found myself being a mentor for other developers with technical and career guidance.</p>
            <p>I offer support both with of these topics.</p>
            <div class="index__topics">
              <div class="index__topic">
                <h4>Technical</h4>
                <ul>
                  <li>Vue/Nuxt</li>
                  <li>CMSs</li>
                  <li>Ecommerce</li>
                  <li>Unity</li>
                  <li>Unreal</li>
                  <li>much more...</li>
                </ul>
                <NuxtLink class="index__button" to="/#technicalsupport">
                  Learn more...
                </NuxtLink>
              </div>
              <div class="index__topic">
                <h4>Career</h4>
                <ul>
                  <li>Job Hunting</li>
                  <li>Interviews</li>
                  <li>CVs</li>
                  <li>Portfolio</li>
                  <li>Personal Branding</li>
                  <li>much more...</li>
                </ul>
                <NuxtLink class="index__button" to="/#careersupport">
                  Learn more...
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </content-with-title>
      <content-block>
        <div class="index__about">
          <div>
            <h2>
              About me
            </h2>
            <p>
              My name is Sebastian Johansson. I am a web developer/designer,
              game developer and all around geek. My greatest interest is of
              course computers and the internet, and I love tech and gadgets.
            </p>
            <p>Anyway... I hope you enjoy your stay.</p>
          </div>
          <div>
            <div id="user-content-toc">
              <ul>
                <summary>
                  <h2 style="display: inline-block;">
                    🗨️ 7 odd ways to reach me 💬
                  </h2>
                </summary>
              </ul>
            </div>
            <div>
              <span>(discord is always prefered)</span>
              <ul>
                <li>
                  <a href="https://discord.com/channels/@me/Sebastian#0002/" rel="me">Discord (Sebastian#0002)</a>
                </li>
                <li>
                  <a href="mailto:hello@sebbejohansson.com" rel="me">Mail</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/sebbejohansson/" rel="me">Linkedin</a>
                </li>
                <li>
                  <a href="https://steamcommunity.com/id/redeyeddragon/" rel="me">Steam</a>
                </li>
                <li>
                  <a href="https://twitter.com/supersebban" rel="me">Twitter</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/supersebban/" rel="me">Instagram DM</a>
                </li>
                <li>
                  Call
                </li>
              </ul>
            </div>
          </div>
        </div>
      </content-block>
    </div>
    <parts-organisms-desktop-menu />
    <div class="index__trakt">
      <a target="_blank" href="https://trakt.tv/users/redeyeddragon" class="index__trakt-link">
        <img
          class="index__trakt-image"
          width="500"
          height="133"
          alt="redeyeddragon"
          src="https://widgets.trakt.tv/users/176286ec5d57f496186c5954408a9ddc/watched/banner@2x.jpg"
          loading="lazy"
        >
      </a>
    </div>
    <content-stalk-list id="contact" class="index__stalk" />
    <parts-organisms-footer />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/elements/buttons.scss";
@use "@/assets/styles/foundation/mixins.scss";
.index {
  &__hero {
    min-height: calc(100vh - 68px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1rem;
    }
  }
  &__topics {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    gap: 1rem;
    @include mixins.for-phone-only() {
      flex-direction: column;
      align-items: center;
    }
    .index__topic ul {
      margin: 0;
      padding: 0;
      list-style: disc;
      li {
        margin: 0;
        padding: 0;
        text-align: left;
      }
    }
    .index__button {
      margin-top: .5rem;
      @include buttons.btn-primary();
      &:hover {
        @include buttons.btn-primary-hover();
      }
      &:disabled {
        @include buttons.btn-primary-disabled();
      }
    }
  }

  &__about {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    @include mixins.for-phone-only() {
    grid-template-columns: 1fr;
    }
  }

  &__title {
    font-family: "Montserrat", sans-serif;
    font-size: 6rem;
    line-height: 6rem;
    margin: 0;
  }

  &__find {
    font-family: "Montserrat", sans-serif;
    margin: 0;
  }

  &__trakt {
    margin: 1rem auto 0;
  }

  &__trakt-link {
    display: block;
  }

  &__trakt-image {
    max-width: 100%;
    height: auto;
    display: block;
  }
}
</style>
