<script setup>
import IconCall from "./icons/Call.vue";
import IconMail from "./icons/Mail.vue";

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
    class: "phone text-green-hover",
    iconClass: "text-green",
  };
};

const makeEmailLink = (email) => {
  return {
    link: `mailto:${email}`,
    text: email,
    icon: IconMail,
    class: "email text-orange-hover",
    iconClass: "text-orange",
  };
};

const makeLinkInfo = (type, value) => {
  const makerByType = {
    phone: makePhoneLink,
    email: makeEmailLink,
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
  <a class="social-link" :class="phoneInfo.class" :href="phoneInfo.link">
    <component :class="phoneInfo.iconClass" :is="phoneInfo.icon" />
    {{ phoneInfo.text }}
  </a>
</template>

<style lang="scss">
.social-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: var(--nbp-text-color);
  transition: color 0.2s ease-in-out;

  @media (max-width: $nbp-tablet-breakpoint) {
    line-height: 42px;
  }

  svg {
    width: 18px;
    height: 18px;
    margin-right: 9px;
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    &.phone > svg {
      transform: rotate(20deg) scale(1.1);
    }

    &.email > svg {
      transform: scale(1.2);
    }
  }
}
</style>
