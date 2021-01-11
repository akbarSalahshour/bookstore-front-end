<template>
  <div>
    <slot name="slider_header" />
    <div id="container_sidebar" class="webkit-scrollbar overflow-y m-0">
      <slot name="slider_main" />
    </div>
  </div>
</template>

<style lang="scss">
@import "~assets/scss/variable.scss";
@import "~assets/scss/mixins.scss";
@import "~assets/scss/functions.scss";
#container_sidebar {
  height: calcSidebarPaperHeight();
  .sidebar-page {
    height: 50px;
    border-radius: 4px;
    background-size: cover;
    @include page-bg();
    &.active {
      border-color: $darkMuted !important;
    }
  }
}
</style>