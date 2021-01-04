<template>
  <b-row class="m-0">
    <b-col
      id="project_tools_top"
      cols="12"
      class="font-20em border-bottom m-0 d-flex p-0"
    >
      <div class="active">
        <i class="far fa-clipboard mx-2"></i>
      </div>
      <div><i class="fas fa-file-alt mx-2"></i></div>
    </b-col>
    <b-col id="project_menu_top" cols="12" class="border-bottom bg-light px-2">
      <div class="d-flex">
        <div
          v-for="src in backgroundImages"
          :key="src"
          :class="['parent-bg-image', { active: src === selectBI }]"
          @click="changeBackgroundImage(src)"
        >
          <img :src="backgroundImg(src)" :alt="altImg(src)" />
        </div>
      </div>
    </b-col>
    <b-col
      id="project_main_box"
      cols="12"
      class="webkit-scrollbar overflow-auto d-flex py-3"
    >
      <textarea
        id="main_page"
        ref="main_page"
        v-if="selectedPage"
        :class="[
          'm-auto',
          'border',
          'p-2',
          'rounded-5',
          `bi-${selectedPage.style.background}`,
        ]"
        :style="setting"
        @scroll="scrollTextarea"
        @change="changeTextarea"
        v-model="valueTextarea"
      >
      </textarea>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectBI: "white",
      valueTextarea: "",
    };
  },
  methods: {
    scrollTextarea() {
      alert("متن مورد نظر از یک صفحه بیشتر است!!");
    },
    changeTextarea() {
      this.$store.commit("pages/updateText", this.valueTextarea);
    },
    backgroundImg(src) {
      return require(`@/assets/img/bg-${src}.png`);
    },
    altImg(src) {
      return `Background ${src}`;
    },
    changeBackgroundImage(src) {
      this.selectBI = src;
      this.$store.commit("pages/updateBI", src);
    },
  },
  watch: {
    selectedPage(value) {
      this.valueTextarea = value.text;
    },
  },
  computed: {
    ...mapGetters("pages", {
      selectedPage: "getSelectedPage",
      setting: "getSetting",
      backgroundImages: "getBackgroundImage",
    }),
  },
};
</script>


<style lang="scss">
@import "~assets/scss/mixins.scss";
#project_tools_top {
  & > div {
    border-left: 1px solid #ddd;
    cursor: pointer;
    &.active {
      background-color: #eaebec;
      cursor: unset;
    }
  }
}
#project_menu_top {
  height: 100px;
  .parent-bg-image {
    height: 80px;
    width: 100px;
    overflow: hidden;
    margin: 10px 5px;
    border: 1px solid #cccccc;
    border-radius: 3px;
    opacity: 0.5;
    &.active,
    &:hover {
      border-color: #777777;
      opacity: 1;
    }
    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  }
}
#project_main_box {
  height: calc(100vh - 47px - 150px);
  #main_page {
    font-size: 0.8em;
    line-height: 2.8em;
    background-repeat: repeat-x, repeat-y;
    background-position: 0 0, 0 -7px;
    background-image: linear-gradient(to right, white 5px, transparent 5px),
      linear-gradient(white 0, white 96%, white 96%, #999999 100%);
    background-size: 0;
    border: 0;
    resize: none;
    overflow: hidden;
    &.bi-dot {
      background-size: 8px 100%, 100% 2.8em;
    }
    &.bi-line {
      background-size: 100%, 100% 2.8em;
    }
    &.bi-squre {
      background-size: 30px 100%, 100% 2.8em;
      background-repeat: repeat;
      background-image: linear-gradient(
          to right,
          #999999,
          1px,
          transparent 1px,
          rgba(255, 0, 0, 0) 1px
        ),
        linear-gradient(
          transparent 25px,
          #999999 26px,
          transparent 25px,
          transparent
        );
      background-position: 20px 7px;
    }
  }
}
</style>