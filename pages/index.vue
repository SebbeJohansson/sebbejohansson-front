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
      <div class="index__hero-top">
        <div class="title">
          <h1>🐉</h1>
          <h1>Sebastian &quot;Dragon&quot; Johansson</h1>
          <h1>🐉</h1>
        </div>
        <div class="index__hero-content">
          <div class="heading">
            <h2>
              Developer and Mentor
            </h2>
            <i>storyblok and nuxt fanatic</i>
          </div>
          <div class="intro">
            <p>After working as a developer for many years, I have many times found myself being a mentor for other developers with technical and career guidance.</p>
            <p>I offer support and guidance for both of these topics.</p>
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
      </div>
      <content-block>
        <div class="index__about">
          <div>
            <h2>
              About me
            </h2>
            <p>
              My name is Sebastian Johansson. I am a web developer/designer, game developer, and all-around geek. My main interests are computers and the internet; I love tech and gadgets.
            </p>
            <p>Anyway... I hope you enjoy your stay.</p>
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
    <content-with-title :title="'Career mentorship & support'" class="index__career">
      <p>
        As a side-effect of working as, with, and for developers for the past years, I have learned much about getting a developer job and progressing in a software development career.
      </p>
      <p>
        I have helped countless developers choose education paths, how to write a resume, what titles help when looking for new jobs, and much more.
      </p>
      <p v-if="false">
        Below you can see the services I offer and whether I take a fee for them or not.
      </p>
      <div v-if="false">
        <ul class="service-list">
          <li>
            <span class="service-title">
              Overview check of CV/Resume
            </span>
            <span class="service-fee">
              Free! (one-time)
            </span>
          </li>
          <li>
            <span class="service-title">
              Help getting your first job (max 2 hours)
            </span>
            <span class="service-fee">
              Free! (one-time)
            </span>
          </li>
          <li>
            <span class="service-title">
              Help with writing a CV/Resume
            </span>
            <span class="service-fee">
              10€ per hour
            </span>
          </li>
          <li>
            <span class="service-title">
              Help with writing a personal/cover letter
            </span>
            <span class="service-fee">
              24€ per hour
            </span>
          </li>
          <li>
            <span class="service-title">
              Long term mentorship (1-2 hours per week)
            </span>
            <span class="service-fee">
              30€ per week
            </span>
          </li>
          <li>
            <span class="service-title">
              Additional support and guidance
            </span>
            <span class="service-fee">
              Please contact for quote
            </span>
          </li>
        </ul>
        <p>(note: prices are 50% off if you can prove you are a student)</p>
      </div>
    </content-with-title>
    <content-with-title :title="'Development mentorship & support'" class="index__tech">
      <p>
        After over ten years as a developer, I have extensive experience with many languages and frameworks. Since I started to develop software, I have also helped others learn how to do it.
      </p>
      <p>
        You can check my portfolio and my GitHub to learn more about my knowledge of specific languages and systems.
      </p>
      <p>
        If you have an issue that you need help with, the easiest way to reach out is on Discord. My handle is Sebastian#0002.
      </p>
      <p v-if="false">
        Below you can see the services I offer and whether I take a fee for them or not. The price often depends on how much active coding it involves.
      </p>
      <div v-if="false">
        <ul class="service-list">
          <li>
            <span class="service-title">
              Hints and guidance with specific small issue
            </span>
            <span class="service-fee">
              Free!
            </span>
          </li>
          <li>
            <span class="service-title">
              Help with specific issue (until fixed)
            </span>
            <span class="service-fee">
              50€ per hour
            </span>
          </li>
          <li>
            <span class="service-title">
              Assist with a specific feature from start to finish within an existing project
            </span>
            <span class="service-fee">
              120€ per hour
            </span>
          </li>
          <li>
            <span class="service-title">
              Develop a feature from start to finish within an existing project
            </span>
            <span class="service-fee">
              Please contact for quote
            </span>
          </li>
          <li>
            <span class="service-title">
              Develop a website or application from start to finish
            </span>
            <span class="service-fee">
              Please contact for quote
            </span>
          </li>
        </ul>
        <p v-if="false">
          (note: prices are 50% off if you can prove you are a student)
        </p>
      </div>

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
@use "@/assets/styles/elements/lists.scss";
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

  .service-list {
    @include lists.service-list();
    margin-top: 1rem;
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
