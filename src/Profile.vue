<script setup>
import { ref, onBeforeMount } from "vue";

import ProfileInfoItem from "./components/ProfileInfoItem.vue";

import CodeSlash from "./components/icons/CodeSlash.vue";
import IconBag from "./components/icons/Bag.vue";
import IconSchool from "./components/icons/School.vue";
import IconCall from "./components/icons/Call.vue";
import IconMail from "./components/icons/Mail.vue";

import workExperience from "./assets/data/work-experience.js";

import { getCVUrl } from "./services/CV.js";

const downloadCVUrl = ref("");

onBeforeMount(async () => {
  downloadCVUrl.value = await getCVUrl();
});
</script>

<template>
  <main>
    <div class="profile container">
      <div class="profile-contacts">
        <div class="profile-contacts__card">
          <img src="./assets/images/profile-photo.jpg" alt="" />

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
  </main>
</template>

<style lang="scss">
.profile {
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
          rgba(255, 255, 255, 0) 70%
        );
      }

      a,
      button {
        display: block;
        width: 100%;
        height: 70px;
        line-height: 70px;
        border: none;
        background: var(--nbp-card-color);
        color: var(--nbp-text-color);
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

@media (max-width: $nbp-tablet-breakpoint) {
  .profile {
    &-contacts {
      max-width: 100%;
      margin-left: 0;
    }

    &-info {
      position: relative;
    }
  }
}

@media (max-width: $nbp-mobile-breakpoint) {
  .profile {
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
