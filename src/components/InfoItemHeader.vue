<script setup>
const props = defineProps({
  icon: { type: Object, default: null },
});
</script>

<template>
  <h2 class="info-header flex items-center">
    <component v-if="props.icon" :is="props.icon" class="info-header__icon" />
    <slot></slot>
  </h2>
</template>

<style lang="scss">
.info-header {
  padding: 12px 0;
  font-size: 1.32em;
  font-weight: 500;

  &__icon {
    max-height: 32px;
    max-width: 32px;

    width: 100%;
    height: 100%;

    margin-right: 18px;
  }
}
</style>
