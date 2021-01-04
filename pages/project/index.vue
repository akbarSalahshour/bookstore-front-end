<template>
  <div class="overflow-hidden">
    <p-top-panel />
    <div id="project_container">
      <div class="project-sidebar border-left">
        <p-sidebar />
      </div>
      <div id="project_pages">
        <p-pages />
      </div>
      <!-- <div class="project-sidebar border-right">
        <p-sidebar />
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  layout: "project",
};
</script>
<style lang="scss">
@import '~assets/scss/variable.scss';
#project_container {
  height: calc(100vh - 47px);
  width: 100vw;
  overflow: hidden;
  display: flex;
  .project-sidebar {
    width: 275px;
  }
  #project_pages {
    width: calc(100vw - (1 * 275px));
  }
}
</style>