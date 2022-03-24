<script setup></script>

<template>
  <div class="profile-item">
    <h3>
      <slot name="icon"></slot>
      <slot name="title"></slot>
    </h3>

    <div class="profile-item__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.profile-item {
  padding-bottom: 1.2em;

  h3 {
    display: inline-flex;
    align-items: center;
    padding: 12px 0;
    svg {
      max-height: 32px;
      max-width: 32px;

      width: 100%;
      height: 100%;

      margin-right: 24px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
