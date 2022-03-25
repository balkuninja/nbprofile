<script setup>
import { ref, onBeforeMount } from "vue";

import ProfileInfoItem from "./components/ProfileInfoItem.vue";

import CodeSlash from "./components/icons/CodeSlash.vue";
import IconBag from "./components/icons/Bag.vue";
import IconSchool from "./components/icons/School.vue";

import profile from "./assets/data/profile.js";

import workExperience from "./assets/data/work-experience.js";
import skills from "./assets/data/skills.js";
import education from "./assets/data/education.js";

import { getCVUrl } from "./services/CV.js";
import SocialLink from "./components/SocialLink.vue";

const downloadCVUrl = ref("");

onBeforeMount(async () => {
  downloadCVUrl.value = await getCVUrl();
});
</script>

<template>
  <main class="profile">
    <div class="container">
      <section class="profile-contacts">
        <div class="profile-contacts__card">
          <img src="./assets/images/profile-photo.jpg" alt="Моя світлина" />

          <div class="profile-contacts__info">
            <h2>{{ profile.name }}</h2>
            <p>{{ profile.position }}</p>
            <p>{{ profile.age }}</p>
            <p>{{ profile.residence }}</p>

            <div class="profile-contacts__info_links">
              <social-link
                v-for="(link, lIdx) in profile.links"
                :key="`profile-links-${lIdx}`"
                v-bind="link"
              />
            </div>
          </div>
        </div>

        <div class="profile-contacts__actions">
          <a class="btn" :href="downloadCVUrl">Завантажити CV</a>
        </div>
      </section>

      <section class="profile-info">
        <div class="scroll-wrapper">
          <div class="profile-info__title">
            <h2>Резюме</h2>
          </div>

          <div class="profile-info__items">
            <profile-info-item class="profile-info__items_skills">
              <template #icon>
                <code-slash class="text-mint" />
              </template>
              <template #title>
                <span class="text-mint">Навички</span>
              </template>

              <template #content>
                <ul>
                  <li
                    v-for="(skill, sIdx) in skills"
                    :key="`profile-skills-${sIdx}`"
                    v-text="skill"
                  />
                </ul>
              </template>
            </profile-info-item>

            <profile-info-item class="profile-info__items_jobs">
              <template #icon>
                <icon-bag class="text-orange" />
              </template>

              <template #title>
                <span class="text-orange">Досвід роботи</span>
              </template>

              <template #content>
                <div
                  class="profile-info__experience"
                  v-for="(exp, expIdx) in workExperience"
                  :key="`work-experience-${expIdx}`"
                >
                  <span>{{ exp.period }}</span>

                  <h3>
                    {{ exp.name }} – <span>{{ exp.position }}</span>
                  </h3>

                  <template v-if="exp.achievement && exp.achievement.length !== 0">
                    <p>Досягнення:</p>
                    <ul>
                      <li
                        v-for="(achievement, achIdx) in exp.achievement"
                        :key="`work-experience-achievement-${achIdx}`"
                        v-text="achievement"
                      />
                    </ul>
                  </template>
                </div>
              </template>
            </profile-info-item>

            <profile-info-item class="profile-info__items_education">
              <template #icon>
                <icon-school class="text-brown" />
              </template>

              <template #title>
                <span class="text-brown">Освіта</span>
              </template>

              <template #content>
                <div class="profile-info__education">
                  <span>{{ education.period }}</span>
                  <h3>{{ education.name }}</h3>
                  <p>Ступінь освіти: {{ education.degree }}</p>
                  <p>Напрям підготовки: {{ education.faculty }}</p>
                </div>
              </template>
            </profile-info-item>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss">
.profile {
  display: flex;
  justify-content: center;
  align-items: center;

  &-contacts {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    margin-left: auto;
    border-radius: 4px;
    background-color: var(--nbp-card-color);
    text-align: center;

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 0 0 4px;
      top: 0;
      left: 0;
      box-shadow: -10px 10px 15px rgb(0 0 0 / 5%);
      z-index: 2;
    }

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      right: -15px;
      top: -15px;
      border-radius: 4px;
      background: linear-gradient(
        225deg,
        rgba(50, 173, 230, 0.1) 0%,
        rgba(242, 242, 247, 0.01) 100%
      );
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

    &__info,
    &__actions {
      z-index: 2;
    }

    &__info_links {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      padding: 12px;

      @media (max-width: $nbp-mobile-breakpoint) {
        flex-direction: column;
        align-items: center;
      }
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

    @media (max-width: $nbp-tablet-breakpoint) {
      max-width: 100%;
      margin-left: 0;
    }

    @media (max-width: $nbp-mobile-breakpoint) {
      max-width: 100%;
      margin-left: 0;
    }
  }

  &-info {
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

    &:before,
    &:after {
      content: "";
      position: absolute;
      height: 32px;
      top: 0;
      left: 0;
      right: 24px;
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

    .scroll-wrapper {
      height: 100%;
      padding-top: 32px;
      padding-inline: 24px;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    &__title {
      padding-bottom: 12px;

      & > * {
        font-weight: 600 !important;
      }

      &:after {
        content: "";
        position: absolute;
        height: 1px;
        bottom: 0;
        left: -24px;
        right: -24px;
        background: radial-gradient(ellipse at left, #ddd 0%, rgba(255, 255, 255, 0) 80%);
      }
    }

    &__education,
    &__experience {
      display: flex;
      flex-direction: column;

      padding-bottom: 2em;

      & > span {
        font-size: 0.89em;
      }

      h3 {
        padding-top: 0;
        padding-bottom: 0.2em;

        white-space: break-spaces;
        font-weight: 600;

        span {
          font-weight: 300;
        }
      }

      &:last-of-type {
        padding-bottom: 0;
      }
    }

    @media (max-width: $nbp-tablet-breakpoint) {
      position: relative;
    }
  }
}
</style>
