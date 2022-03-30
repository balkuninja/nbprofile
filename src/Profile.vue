<script setup>
import { ref, onBeforeMount } from "vue";

import InfoItem from "./components/InfoItem.vue";
import InfoItemHeader from "./components/InfoItemHeader.vue";
import InfoItemContent from "./components/InfoItemContent.vue";

import SocialLink from "./components/SocialLink.vue";

import IconCodeSlash from "./components/icons/CodeSlash.vue";
import IconBag from "./components/icons/Bag.vue";
import IconSchool from "./components/icons/School.vue";

import profile from "./assets/data/profile.js";
import workExperience from "./assets/data/work-experience.js";
import skills from "./assets/data/skills.js";
import education from "./assets/data/education.js";

import { getCVUrl } from "./services/CV.js";

const downloadCVUrl = ref("");

onBeforeMount(async () => {
  downloadCVUrl.value = await getCVUrl();
});
</script>

<template>
  <main class="page">
    <div class="container">
      <section class="profile-contacts">
        <div class="flex column full-height text-center bg-card shadow">
          <div class="grow-full">
            <img src="./assets/images/profile-photo.webp" alt="Моя світлина" />

            <h2>{{ profile.name }}</h2>
            <p>{{ profile.position }}</p>
            <p>{{ profile.age }}</p>
            <p>{{ profile.residence }}</p>

            <div class="profile-contacts__links flex justify-around">
              <social-link
                v-for="(link, lIdx) in profile.links"
                :key="`profile-links-${lIdx}`"
                v-bind="link"
              />
            </div>
          </div>

          <div class="profile-contacts__actions">
            <a class="btn" :href="downloadCVUrl">Завантажити CV</a>
          </div>
        </div>
      </section>

      <section class="profile-info">
        <div class="scroll-container pa-x">
          <header class="profile-info__header">
            <h1>Резюме</h1>
          </header>

          <info-item>
            <info-item-header class="text-mint" :icon="IconCodeSlash"> Навички </info-item-header>

            <info-item-content>
              <ul>
                <li
                  v-for="(skill, sIdx) in skills"
                  :key="`profile-skills-${sIdx}`"
                  v-text="skill"
                />
              </ul>
            </info-item-content>
          </info-item>

          <info-item>
            <info-item-header class="text-orange" :icon="IconBag"> Досвід роботи </info-item-header>

            <info-item-content
              v-for="(exp, expIdx) in workExperience"
              :key="`work-experience-${expIdx}`"
            >
              <span>{{ exp.period }}</span>

              <h3>
                {{ exp.name }} – <span class="text-light">{{ exp.position }}</span>
              </h3>

              <template v-if="exp.achievement && exp.achievement.length !== 0">
                <p>Досягнення:</p>

                <ul>
                  <li
                    v-for="(achievement, achIdx) in exp.achievement"
                    :key="`work-experience-achievement-${achIdx}`"
                  >
                    {{ achievement }}
                  </li>
                </ul>
              </template>
            </info-item-content>
          </info-item>

          <info-item>
            <info-item-header class="text-brown" :icon="IconSchool">
              Досвід роботи
            </info-item-header>

            <info-item-content>
              <span>{{ education.period }}</span>
              <h3>{{ education.name }}</h3>
              <p>Ступінь освіти: {{ education.degree }}</p>
              <p>Напрям підготовки: {{ education.faculty }}</p>
            </info-item-content>
          </info-item>
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss">
.profile-contacts {
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  border-radius: 4px;
  z-index: 1;

  @media (max-width: $nbp-tablet-breakpoint) {
    max-width: 100%;
    margin-left: 0;
  }

  @media (max-width: $nbp-mobile-breakpoint) {
    max-width: 100%;
    margin-left: 0;
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    right: -15px;
    top: -15px;
    border-radius: 4px;
    background: linear-gradient(225deg, rgba(50, 173, 230, 0.1) 0%, rgba(242, 242, 247, 0.01) 100%);
    z-index: -1;

    @media (max-width: $nbp-mobile-breakpoint) {
      display: none;
    }
  }

  img {
    width: 100%;
    height: 400px;
    max-height: 54vh;
    object-fit: cover;
    clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 50% 100%, 0% 90%);
  }

  &__links {
    padding: 12px;
    column-gap: 16px;
  }

  &__actions:before {
    content: "";
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background: radial-gradient(ellipse at center, #ddd 0%, rgba(255, 255, 255, 0) 70%);
  }
}

.profile-info {
  position: absolute;
  width: auto;
  height: auto;
  top: 15px;
  bottom: 15px;
  left: 0;
  right: 400px;
  border-radius: 4px;
  background-color: var(--nbp-card-color);
  overflow: hidden;

  @media (max-width: $nbp-tablet-breakpoint) {
    position: relative;
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    height: 25px;
    top: 0;
    left: 0;
    right: var(--nbp-offset-x);
    background: linear-gradient(
      0deg,
      rgba(var(--nbp-card-color-rgb), 0) 0%,
      rgb(var(--nbp-card-color-rgb), 0.9) 100%
    );
    clip-path: ellipse(90% 100% at top);
    z-index: 1;
  }

  &:after {
    top: auto;
    bottom: 0;
    transform: rotate(180deg);
  }

  &__header {
    height: 60px;
    line-height: 60px;

    h1 {
      font-weight: 500 !important;
    }

    &:after {
      content: "";
      position: absolute;
      height: 1px;
      bottom: 0;
      left: calc(var(--nbp-offset-x) * -1);
      right: calc(var(--nbp-offset-x) * -1);
      background: radial-gradient(ellipse at left, #ddd 0%, rgba(255, 255, 255, 0) 80%);
    }
  }
}
</style>
