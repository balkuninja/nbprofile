<script setup>
import IconCall from "./icons/Call.vue";
import IconMail from "./icons/Mail.vue";
import LogoLinkedin from "./icons/LogoLinkedin.vue";
import LogoTelegram from "./icons/LogoTelegram.vue";

import { computed } from "vue";

const props = defineProps({
  type: { type: String, required: true },
  value: { type: String, required: true },
  withContent: { type: Boolean, default: true },
});

const linkDataNormalizer = ({ link, text, icon, target, classList, iconClass }) => {
  return { link, text, icon, target, classList, iconClass };
};

const makePhoneLink = (phone) => {
  return {
    link: `tel:${phone.replace(/ /g, "")}`,
    text: phone,
    icon: IconCall,
    target: "_self",
    classList: "phone text-green-all-state",
    iconClass: "text-green",
  };
};

const makeEmailLink = (email) => {
  return {
    link: `mailto:${email}`,
    text: email,
    icon: IconMail,
    target: "_self",
    classList: "email text-orange-all-state",
    iconClass: "text-orange",
  };
};

const makeLinkedinLink = (link) => {
  return {
    link,
    text: "",
    icon: LogoLinkedin,
    target: "_blank",
    classList: "linkedin text-blue-all-state",
    iconClass: "text-blue",
  };
};

const makeTelegramLink = (link) => {
  return {
    link,
    text: "",
    icon: LogoTelegram,
    target: "_blank",
    classList: "telegram text-cyan-all-state",
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

  return linkDataNormalizer(maker(value));
};

const linkData = computed(() => makeLinkInfo(props.type, props.value));
</script>

<template>
  <a
    class="social-link"
    :class="linkData.classList"
    :href="linkData.link"
    :target="linkData.target"
    role="link"
    tabindex="0"
  >
    <component :class="linkData.iconClass" :is="linkData.icon" />
    {{ linkData.text }}
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
