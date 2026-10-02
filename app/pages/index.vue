<script setup lang="ts">
  definePageMeta({
    layout: 'blank',
  });
  useHead({
    title: 'SebbeJohansson',
    meta: [{
      name: 'description',
      content: 'AI Engineer and developer helping companies with AI and software development.',
    }],
  });
</script>

<template>
  <div class="page index">
    <div class="index__hero">
      <div class="index__hero-top">
        <h1 class="index__title">
          <span class="index__title-emoji" aria-hidden="true">🐉</span>
          <span>Sebastian &quot;Dragon&quot; Johansson</span>
          <span class="index__title-emoji" aria-hidden="true">🐉</span>
        </h1>
        <div class="index__hero-content">
          <div class="index__heading">
            <h2 class="index__role">
              AI Engineer &amp; Developer
            </h2>
            <p class="index__tagline">
              putting AI to work, backed by years of building software
            </p>
          </div>
          <div class="index__intro">
            <p>I'm an AI Engineer with over ten years of experience as a full-stack developer.</p>
            <p>I help companies get real value out of AI, and build the software around it.</p>
          </div>
          <div class="index__topics">
            <div class="index__topic">
              <h3 class="index__topic-title">
                AI
              </h3>
              <ul>
                <li>LLM integrations</li>
                <li>AI agents &amp; automation</li>
                <li>AI-assisted development</li>
                <li>Workflows &amp; tooling</li>
                <li>Strategy &amp; adoption</li>
              </ul>
              <NuxtLink class="index__button" to="/#ai">
                Learn more...
              </NuxtLink>
            </div>
            <div class="index__topic">
              <h3 class="index__topic-title">
                Software development
              </h3>
              <ul>
                <li>Vue/Nuxt</li>
                <li>Headless CMS (Storyblok)</li>
                <li>Ecommerce</li>
                <li>APIs &amp; integrations</li>
                <li>Unity/Unreal</li>
              </ul>
              <NuxtLink class="index__button" to="/#development">
                Learn more...
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <content-block>
        <div class="index__about">
          <div>
            <h2>
              About me
            </h2>
            <p>
              My name is Sebastian Johansson. I work as an AI Engineer, with a background of more than ten years as a full-stack developer across web, ecommerce, and games.
            </p>
            <p>
              Today I help companies bring AI into their products and workflows, and build the software that makes it work. Outside of work I'm an all-around geek who loves tech and gadgets.
            </p>
          </div>
          <div>
            <h2>
              🗨️ 7 ways to reach me 🗨️
            </h2>
            <div>
              <p>(discord is always prefered)</p>
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
                <li v-if="false">
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
    <content-with-title id="ai" :title="'AI'" class="index__ai">
      <p>
        I work as an AI Engineer, helping teams figure out where AI actually makes a difference and then building it.
      </p>
      <p>
        That can mean integrating LLMs into a product, setting up agents that automate repetitive work, or getting a dev team productive with AI-assisted coding.
      </p>
      <p>
        If you want to talk about what AI could do for your company, reach out.
      </p>
      <NuxtLink class="index__button" to="mailto:hello@sebbejohansson.com">
        Get in touch
      </NuxtLink>
    </content-with-title>

    <content-with-title id="development" :title="'Software development'" class="index__tech">
      <p>
        After over ten years as a developer, I have worked with many languages, frameworks, and platforms, from web and ecommerce to games.
      </p>
      <p>
        I help companies build new products, extend existing ones, and solve the technical problems that slow teams down.
      </p>
      <p>
        You can check my portfolio and my GitHub to see what I have built.
      </p>
      <NuxtLink class="index__button" to="/portfolio">
        Checkout my portfolio
      </NuxtLink>
      <NuxtLink class="index__button" to="https://github.com/SebbeJohansson">
        Checkout my github
      </NuxtLink>
    </content-with-title>
    <div class="index__support-me">
      <a href="https://www.buymeacoffee.com/sebbejohansson">
        <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a Monster&emoji=🐉&slug=sebbejohansson&button_colour=000000&font_colour=48e704&font_family=Bree&outline_colour=48e704&coffee_colour=48e704" height="40px">
      </a>
      <p>If you appreciate anything I have built, consider supporting me by fuiling my caffein addiction.</p>
    </div>
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
  .index__button {
    @include buttons.btn-primary();
    margin: 0.5rem;
    &:hover {
      @include buttons.btn-primary-hover();
    }
    &:disabled {
      @include buttons.btn-primary-disabled();
    }
  }

  &__hero {
    min-height: calc(100vh - 68px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 1rem;
    .index__hero-top {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      padding: 3rem 0 2rem;
    }
    &-content {
      max-width: 760px;
      width: 100%;
      margin: 0 auto;
      padding: 0 1rem;
      text-align: center;
    }
  }

  &__title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.35em;
    margin: 0 0 1.5rem;
    padding: 0 1rem;
    font-family: $heading-font;
    font-size: clamp(1.75rem, 1rem + 3.2vw, 3.25rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    text-align: center;
    text-wrap: balance;
    @include mixins.for-phone-only() {
      .index__title-emoji {
        display: none;
      }
    }
  }

  &__heading {
    margin-bottom: 1.25rem;
  }

  &__role {
    margin: 0;
    font-family: $heading-font;
    font-size: clamp(1.15rem, 0.9rem + 1vw, 1.5rem);
    font-weight: 500;
    line-height: 1.3;
  }

  &__tagline {
    margin: 0.35rem 0 0;
    font-style: italic;
    font-size: 1rem;
    color: $text-muted;
  }

  &__intro {
    font-size: 1.125rem;
    line-height: 1.6;
    color: $text-muted;
    p {
      margin: 0;
    }
  }

  &__topics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 2.25rem;
    text-align: left;
    @include mixins.for-phone-only() {
      grid-template-columns: 1fr;
    }
  }

  &__topic {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background-color: $cover-dark;
    border: 1px solid $border-dark;
    border-radius: 10px;
    box-shadow: 0 4px 16px $shadow-dark;
    ul {
      flex-grow: 1;
      margin: 0 0 1.5rem;
      padding: 0;
      list-style: disc;
      li {
        margin: 0 0 0.4rem 1.2rem;
        padding: 0;
        line-height: 1.4;
      }
    }
    .index__button {
      margin: 0;
      width: 100%;
    }
  }

  &__topic-title {
    margin: 0 0 0.85rem;
    font-family: $heading-font;
    font-size: 1.1rem;
    font-weight: 600;
  }

  :deep(.desktop-menu__logo-wrapper){
    display: none;
  }

  &__about {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    @include mixins.for-phone-only() {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .title {
      margin: 0;
    }
  }

  &__support-me {
    margin: 1rem auto;
    text-align: center;
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
