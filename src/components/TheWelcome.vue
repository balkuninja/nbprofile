<script setup>
import { ref, onBeforeMount } from "vue";

import ProfileInfoItem from "./ProfileInfoItem.vue";

import CodeSlash from "./icons/CodeSlash.vue";
import IconBag from "./icons/Bag.vue";
import IconSchool from "./icons/School.vue";
import IconCall from "./icons/Call.vue";
import IconMail from "./icons/Mail.vue";

import workExperience from "../assets/data/work-experience.js";

import { getCVUrl } from "../services/CV.js";
// import { getProfilePhotoURL } from "@/services/profile";

const downloadCVUrl = ref("");
// const profilePhotoURL = ref(
//   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
// );

onBeforeMount(() => {
  getCVUrl().then((url) => (downloadCVUrl.value = url));

  // getProfilePhotoURL().then((url) => (profilePhotoURL.value = url));
});
</script>

<template>
  <div class="profile">
    <div class="profile-contacts">
      <div class="profile-contacts__card">
        <img src="../assets/images/profile-photo.jpg" alt="" />

        <div class="profile-contacts__info">
          <h2>Balkunov Nikita</h2>
          <p>Software Engineer</p>
          <p>24 years old</p>
          <p>Kyiv, Ukraine</p>

          <p class="profile-contacts__info_links">
            <a
              class="profile-contacts__info_links_phone"
              href="tel:+380500787871"
            >
              <icon-call />
              +380 50 078 78 71
            </a>
            <a
              class="profile-contacts__info_links_email"
              href="mailto:balkunovn@gmail.com"
            >
              <icon-mail />
              balkunovn@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div class="profile-contacts__actions">
        <a :href="downloadCVUrl">Завантажити CV</a>
      </div>
    </div>

    <div class="profile-info">
      <div class="scroll-wrapper">
        <div class="profile-info__header"></div>
        <div class="profile-info__title">
          <h2>Резюме</h2>
        </div>

        <div class="profile-info__items">
          <profile-info-item class="profile-info__items_skills">
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
                <li>HTML</li>
                <li>CSS</li>
              </ul>
            </template>
          </profile-info-item>

          <profile-info-item class="profile-info__items_jobs">
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

          <profile-info-item class="profile-info__items_education">
            <template #icon>
              <icon-school />
            </template>
            <template #title>Освіта</template>
            <template #content>
              <div class="profile-info__education">
                <span>2015 – 2019 рр.</span>
                <h3>НТУУ КПІ ім. І. Сікорського, Київ</h3>
                <p>Ступінь освіти: бакалавр</p>
                <p>Напрям підготовки: телекомунікації</p>
              </div>
            </template>
          </profile-info-item>
        </div>
      </div>
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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
      max-height: 54vh;
      height: 400px;
      object-fit: cover;
    }

    &__info,
    &__actions {
      z-index: 2;
    }

    &__info {
      &_links {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 12px;

        a {
          display: inline-flex;
          align-items: center;

          text-decoration: none;
          color: var(--nbp-text-color);

          transition: color 0.2s ease-in-out;

          svg {
            width: 18px;
            height: 18px;
            margin-right: 9px;

            transition: transform 0.2s ease-in-out;
          }
        }

        &_phone {
          fill: rgb(52, 199, 89);

          &:hover {
            color: rgb(52, 199, 89);

            svg {
              transform: rotate(20deg) scale(1.1);
            }
          }
        }

        &_email {
          fill: rgb(255, 149, 0);

          &:hover {
            color: rgb(255, 149, 0);

            svg {
              transform: scale(1.2);
            }
          }
        }
      }
    }

    &__actions {
      &:before {
        content: "";
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        background: radial-gradient(
          ellipse at center,
          #ddd 0%,
          rgba(var(--nbp-card-color-rgb), 0) 70%
        );
      }
      a,
      button {
        display: block;

        width: 100%;
        height: 70px;
        line-height: 70px;

        background: var(--nbp-card-color);
        color: var(--nbp-text-color);

        border: none;

        font-size: 16px;
        font-weight: 500;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;

        cursor: pointer;

        transition: color 0.2s ease-in-out;

        &:hover {
          color: #32ade6;
        }
      }
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

    overflow: hidden;

    &:before,
    &:after {
      content: "";
      position: absolute;
      height: 32px;

      left: 0;
      right: 24px;
      top: 0;

      z-index: 1;
      background: #fff;

      background: linear-gradient(
        0deg,
        rgba(var(--nbp-card-color-rgb), 0) 0%,
        rgb(var(--nbp-card-color-rgb), 0.9) 100%
      );

      clip-path: ellipse(90% 100% at top);
    }

    &:after {
      top: auto;
      bottom: 0;
      transform: rotate(180deg);
    }

    .scroll-wrapper {
      height: 100%;

      overflow-x: hidden;
      overflow-y: scroll;

      padding-top: 32px;
      padding-inline: 24px;
    }

    &__title {
      padding-bottom: 12px;

      & > * {
        font-weight: 600 !important;
      }

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

    &__items_skills > h3 {
      fill: rgb(102, 212, 207);
      color: rgb(102, 212, 207);
    }

    &__items_jobs > h3 {
      fill: rgb(255, 159, 10);
      color: rgb(255, 159, 10);
    }

    &__items_education > h3 {
      fill: rgb(172, 142, 104);
      color: rgb(172, 142, 104);
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
  }
}

@media (max-width: 912px) {
  body {
    position: relative;
    overflow: auto;
  }

  .profile {
    flex-direction: column;
    align-items: center;

    max-width: 720px;

    &-contacts {
      max-width: 100%;

      margin-left: 0;
    }

    &-info {
      position: relative;
    }
  }
}

@media (max-width: 576px) {
  .profile {
    margin: 0;

    &-contacts {
      max-width: 100%;

      margin-left: 0;

      &:after {
        display: none;
      }

      &__info_links {
        flex-direction: column;
        align-items: center;
      }
    }

    &-info {
      position: relative;
    }
  }
}
</style>
