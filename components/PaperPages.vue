<template>
  <b-row class="m-0">
    <b-col
      id="project_tools_header"
      cols="12"
      class="font-16em border-bottom m-0 d-flex p-0"
    >
      <div
        v-for="(icon, index) in menuIconTop"
        :key="index"
        :class="['p-1', { active: slectMenuTop == index }]"
        @click="slectMenuTop = index"
      >
        <i :class="[...icon, 'mx-2']"></i>
      </div>
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
          selectedPage.style.background,
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
      slectMenuTop: 0,
      menuIconTop: [
        ["fas", "fa-sliders-h"],
        ["far", "fa-clipboard"],
      ],
    };
  },
  methods: {
    scrollTextarea() {
      alert("متن مورد نظر از یک صفحه بیشتر است!!");
    },
    changeTextarea() {
	  let param={
		  key:'text',
		  value:this.valueTextarea
	  }
      this.$store.commit("pages/updatePages", param);
    },
    backgroundImg(src) {
      return require(`@/assets/img/${src}.png`);
    },
    altImg(src) {
      return `Background ${src}`;
    },
    changeBackgroundImage(src) {
	  this.selectBI = src;
	  let param={
		  key:'style',
		  subKey:'background',
		  value:src
	  }
      this.$store.commit("pages/updatePages", param);
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
@import "~assets/scss/functions.scss";
@import "~assets/scss/variable.scss";
$marginXBgImage: 10px;
#project_tools_header {
  height: $tools-header-height;
  overflow: hidden;
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
  height: $paper-settings-height-default;
  .parent-bg-image {
    height: calcParentBgImageHeight($marginXBgImage);
    width: 100px;
    overflow: hidden;
    margin: $marginXBgImage 5px;
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
  height: calcMainHeight();
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
    &.bg-dot {
      background-size: 8px 100%, 100% 2.8em;
    }
    &.bg-line {
      background-size: 100%, 100% 2.8em;
    }
    &.bg-squre {
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