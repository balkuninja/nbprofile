<script setup>
import IconCall from "./icons/Call.vue";
import IconMail from "./icons/Mail.vue";
import LogoLinkedin from "./icons/LogoLinkedin.vue";
import LogoTelegram from "./icons/LogoTelegram.vue";

import { computed } from "vue";

const props = defineProps({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const makePhoneLink = (phone) => {
  return {
    link: `tel:${phone.replace(/ /g, "")}`,
    text: phone,
    icon: IconCall,
    class: "phone text-green-all-state",
    iconClass: "text-green",
  };
};

const makeEmailLink = (email) => {
  return {
    link: `mailto:${email}`,
    text: email,
    icon: IconMail,
    class: "email text-orange-all-state",
    iconClass: "text-orange",
  };
};

const makeLinkedinLink = (link) => {
  return {
    link,
    text: "",
    icon: LogoLinkedin,
    class: "linkedin text-blue-all-state",
    iconClass: "text-blue",
  };
};

const makeTelegramLink = (link) => {
  return {
    link,
    text: "",
    icon: LogoTelegram,
    class: "telegram text-cyan-all-state",
    iconClass: "text-cyan",
  };
};

const makeLinkInfo = (type, value) => {
  const makerByType = {
    phone: makePhoneLink,
    email: makeEmailLink,
    linkedin: makeLinkedinLink,
    telegram: makeTelegramLink,
  };

  const maker = makerByType[type];
  if (!maker) {
    throw new Error("Type not allowed");
  }

  return maker(value);
};

const phoneInfo = computed(() => {
  return makeLinkInfo(props.type, props.value);
});
</script>

<template>
  <a
    class="social-link"
    :class="phoneInfo.class"
    :href="phoneInfo.link"
    target="_blank"
    role="link"
    tabindex="0"
  >
    <component :class="phoneInfo.iconClass" :is="phoneInfo.icon" />
    {{ phoneInfo.text }}
  </a>
</template>

<style lang="scss">
.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  height: 42px;
  min-width: 42px;
  padding: 6px;
  line-height: 42px;
  text-indent: 0.4em;
  color: var(--nbp-text-color);
  transition: color 0.2s ease-out;
  outline: 1px solid transparent;

  svg {
    width: 1.32em;
    height: 1.32em;
    transition: transform 0.2s ease-in-out;
  }

  &:focus {
    outline: 1px solid var(--nbp-blue-color);
    border-radius: 3px;
  }

  &:hover,
  &:focus {
    svg {
      transform: scale(1.2);
    }

    &.phone > svg {
      transform: rotate(20deg) scale(1.1);
    }
  }
}
</style>
