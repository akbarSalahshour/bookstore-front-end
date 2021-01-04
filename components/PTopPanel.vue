<template>
  <div id="top_panel" class="px-2 py-1 border-bottom bg-light" ref="top_panel">
    <b-row>
      <b-col cols="6" class="parent-top-right-parnel">
        <i class="fas fa-arrow-alt-circle-right"></i>
        <i class="fas fa-arrow-alt-circle-left"></i>
        <i class="fas fa-download"></i>
        <i class="fas fa-expand-arrows-alt"></i>
        <i class="far fa-hand-rock"></i>
        <i class="fas fa-eye"></i>
      </b-col>
      <b-col cols="6" class="text-left">
        <b-button class="px-4" variant="primary">
          <i class="far fa-save ml-1"></i>
          ذخیره
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>


<style lang="scss">
@import "@/assets/scss/variable.scss";
.parent-top-right-parnel i {
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  font-size: 18px;
  color: $darkMuted;
  margin: auto 5px;
  cursor: pointer;
}
</style>