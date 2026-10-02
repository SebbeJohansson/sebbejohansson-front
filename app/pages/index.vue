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
        <div class="title">
          <h1>🐉</h1>
          <h1>Sebastian &quot;Dragon&quot; Johansson</h1>
          <h1>🐉</h1>
        </div>
        <div class="index__hero-content">
          <div class="heading">
            <h2>
              AI Engineer &amp; Developer
            </h2>
            <i>putting AI to work, backed by years of building software</i>
          </div>
          <div class="intro">
            <p>I'm an AI Engineer with over ten years of experience as a full-stack developer.</p>
            <p>I help companies get real value out of AI, and build the software around it.</p>
            <div class="index__topics">
              <div class="index__topic">
                <h4>AI</h4>
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
                <h4>Software development</h4>
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
      <p>Support me by fuiling my caffein addiction.</p>
      <a href="https://www.buymeacoffee.com/sebbejohansson">
        <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a Monster&emoji=🐉&slug=sebbejohansson&button_colour=000000&font_colour=48e704&font_family=Bree&outline_colour=48e704&coffee_colour=48e704" height="40px">
      </a>
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
    .index__hero-top {
      flex-grow: 1;;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .title {
      display: inline-flex;
      flex-direction: column;
      margin: 1rem 0;
      width: 100%;
      @include mixins.for-tablet-and-desktop-only() {
        flex-direction: row;
        justify-content: center;
      }
      h1 {
        text-align: center;
        font-family: "Montserrat", sans-serif;
        margin: 0;
        line-height: 1;
      }
      h2 {
        text-align: center;
        line-height: 1;
      }
    }
    .heading {
      font-family: math, serif;
      h2 {
        line-height: 1;
      }
    }
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
      align-items: flex-start;
    }
    .index__topic ul {
      margin: 0;
      padding: 0;
      list-style: disc;
      li {
        margin: 0;
        padding: 0;
        text-align: left;
        margin-left: 1.2rem;
      }
    }
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
