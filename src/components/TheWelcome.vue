<script setup>
import ProfileInfoItem from "./ProfileInfoItem.vue";

import CodeSlash from "./icons/CodeSlash.vue";
import IconBag from "./icons/Bag.vue";
import IconSchool from "./icons/School.vue";

import workExperience from "../assets/data/work-experience.js";
import { ref } from "vue";
let value = ref(0);
</script>

<template>
  <div class="profile">
    <div class="profile-contacts">
      <img src="@/assets/images/profile-photo.jpg" alt="" />

      <div style="z-index: 2">
        <h2>Balkunov Nikita</h2>
        <p>Full Stack Developer</p>
        <p>24 years old</p>
        <p>Kyiv</p>

        <button @click="value++" style="z-index: 2">{{ value }}</button>
      </div>
    </div>

    <div class="profile-info">
      <div class="profile-info__header"></div>
      <div class="scroll-wrapper">
        <div class="profile-info__header"></div>
        <div class="profile-info__title">
          <h2>Резюме</h2>
        </div>

        <div class="profile-info__items">
          <profile-info-item>
            <template #icon>
              <code-slash />
            </template>
            <template #title>Навички</template>
            <template #content>
              <ul>
                <li>PHP</li>
                <li>SQL (MySQL)</li>
                <li>
                  JavaScript (Electron, Vue js, JQuery, Quasar, Materialize,
                  Cordova, Capacitor, Ionic, Node Js)
                </li>
              </ul>
            </template>
          </profile-info-item>

          <profile-info-item>
            <template #icon>
              <icon-bag />
            </template>
            <template #title>Досвід роботи</template>
            <template #content>
              <div
                class="profile-info__experience"
                v-for="(exp, expIdx) in workExperience"
                :key="`work-experience-${expIdx}`"
              >
                <span>{{ exp.period }}</span>
                <h3>
                  {{ exp.name }} – <span> {{ exp.position }}</span>
                </h3>
                <template
                  v-if="exp.achievement && exp.achievement.length !== 0"
                >
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
              </div>
            </template>
          </profile-info-item>

          <profile-info-item>
            <template #icon>
              <icon-school />
            </template>
            <template #title>Освіта</template>
            <template #content>
              <div class="profile-info__experience">
                <span>2015 – 2019 рр.</span>
                <h3>НТУУ КПІ ім. І. Сікорського, Київ</h3>
                <p>Ступінь освіти: бакалавр</p>
                <p>Напрям підготовки: телекомунікації</p>
              </div>
            </template>
          </profile-info-item>
        </div>
      </div>
      <div class="profile-info__footer"></div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  position: fixed;
  inset: 0;
  overflow: hidden;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile {
  display: flex;

  margin: 5vh;
  max-width: 1268px;
  width: 100%;
  min-height: 90vh;

  &-contacts {
    max-width: 400px;
    width: 100%;
    border-radius: 4px;
    margin-left: auto;
    background-color: var(--nbp-card-color);
    text-align: center;

    &:before {
      content: "";
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: -10px 10px 15px rgb(0 0 0 / 5%);
      border-radius: 0 0 4px;
    }

    &:after {
      content: "";
      position: absolute;

      z-index: -1;

      right: -15px;
      top: -15px;

      width: 100%;
      height: 100%;

      background: linear-gradient(
        225deg,
        rgba(50, 173, 230, 0.1) 0%,
        rgba(242, 242, 247, 0.01) 100%
      );

      border-radius: 4px;
    }

    img {
      clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 50% 100%, 0% 90%);
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
  }

  &-info {
    position: absolute;
    left: 0;
    right: 400px;
    top: 15px;
    bottom: 15px;
    width: auto;
    height: auto;
    background-color: var(--nbp-card-color);
    border-radius: 4px;

    padding-inline: 24px;

    overflow: hidden;

    &__header,
    &__footer {
      position: absolute;
      height: 32px;

      left: 0;
      right: 24px;
      top: 0;

      z-index: 1;
      background: #fff;

      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0) 0%,
        rgb(255, 255, 255, 0.9) 100%
      );

      clip-path: ellipse(90% 100% at top);
    }

    &__footer {
      top: auto;
      bottom: 0;
      transform: rotate(180deg);
    }

    .scroll-wrapper {
      height: 100%;

      overflow-x: hidden;
      overflow-y: scroll;

      margin-right: -24px;
      padding-right: 24px;
      padding-top: 32px;
    }

    &__title {
      padding-bottom: 12px;

      &:after {
        content: "";
        position: absolute;

        left: -24px;
        right: -24px;
        bottom: 0;

        height: 1px;

        background: radial-gradient(
          ellipse at left,
          #ddd 0%,
          rgba(255, 255, 255, 0) 80%
        );
      }
    }

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
  }
}
</style>
