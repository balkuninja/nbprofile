<template>
  <div class="info-content">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.info-content {
  display: flex;
  flex-direction: column;

  padding-bottom: 2em;

  & > span {
    font-size: 0.89em;
  }

  & > h3 {
    padding-top: 0;
    padding-bottom: 0.2em;

    white-space: break-spaces;
    font-weight: 600;
  }

  &:last-of-type {
    padding-bottom: 0;
  }
}
</style>
