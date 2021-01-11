<template>
  <div id="project_main_box" class="d-flex webkit-scrollbar overflow-auto p-4">
    <!-- کادر اصلی جلد کتاب -->
    <div
      id="book_box"
      ref="book_box"
      :class="['position-relative', 'm-auto', { selected: selectId == 0 }]"
      :style="returnStyleObject(setting.style)"
      @click="changeSelected(0)"
    >
      <!-- تمام لایه های روی جلد کتاب -->
      <div
        :class="['position-absolute', { selected: selectId == layer.id }]"
        v-for="layer in layers"
        :key="layer.id"
        :style="returnStyleObject(layer.style)"
        @click.stop="changeSelected(layer.id)"
      >
        <!-- آیکون های تنظیماتی -->
        <div
          class="icons-parent-div position-absolute d-none flex-row-reverse flex-wrap font-16 rounded-top"
        >
          <div>
            <i
              class="fas fa-trash-alt cursor-pointer"
              @click.stop="deleteLayer(layer.id)"
            ></i>
          </div>
          <div>
            <i
              class="fas fa-arrows-alt cursor-alias"
              @mousedown="isDrawing = true"
            ></i>
          </div>
        </div>
        <!-- آیکون های تنظیماتی -->
        <!-- نوع لایه -> متنی -->
        <input
          v-if="layer.type == 'text'"
          class="col-12 h-100 flex-nowrap overflow-hidden"
          :value="layer.value"
          @blur="blurLayerInput($event)"
          type="text"
        />
        <!-- نوع لایه -> متنی -->
        <!-- نوع لایه -> عکس پس زمینه -->
        <b-col
          v-else-if="layer.type == 'image'"
          class="col-12 h-100 background-size-100"
          :style="{ backgroundImage: `url('${layer.style.backgroundImage}')` }"
        />
        <!-- نوع لایه -> عکس پس زمینه -->
      </div>
      <!-- تمام لایه های روی جلد کتاب -->
    </div>
    <!-- کادر اصلی جلد کتاب -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isDrawing: false,
    };
  },
  methods: {
    //انتخاب کادر اصلی یا لایه
    changeSelected(id) {
      this.$store.commit("coverLayers/changeSelected", id);
    },
    //حذف لایه
    deleteLayer(id) {
      this.changeSelected(0);
      this.$store.commit("coverLayers/deleteLayer", id);
    },
    //گرفتن آرایه و تبدیل به آبجکت
    //بعدا با vuejs 3 این قسمت حذفش کن
    returnStyleObject(style) {
      return style.map((item) => {
        if (item.unit) return { [item.name]: item.value + item.unit };
        else return { [item.name]: item.value };
      });
    },
    //آپدیت کردن متن جدید در vuex
    blurLayerInput(e) {
      let param = [
        {
          key: "value",
          value: e.target.value,
        },
      ];
      this.$store.commit("coverLayers/updateLayers", param);
    },
  },
  computed: {
    ...mapGetters("coverLayers", {
      setting: "getSetting",
      layers: "getlayers",
      selectId: "getSelectId",
    }),
  },
  created() {
    //جابجایی لایه
    document.addEventListener("mousemove", (e) => {
      //موس رو روی آیکون نگه نداشته باشد
      if (!this.isDrawing) return false;
      const offsetMouseX = -40;
      const offsetMouseY = 15;
      let book_box = this.$refs["book_box"].getBoundingClientRect();
      const offsetX = e.x - book_box.x;
      const offsetY = e.y - book_box.y;
      const selectedLayer = document.querySelector("#book_box > div.selected");
      //لایه فقط در کادر بتواند جابجا شود
      if (
        (e.x != 0 || e.y != 0) &&
        (offsetX + offsetMouseX < 0 ||
          offsetX + offsetMouseX + selectedLayer.clientWidth > book_box.width ||
          offsetY + offsetMouseY < 0 ||
          offsetY + offsetMouseY + selectedLayer.clientHeight > book_box.height)
      )
        return false;
      //آپدیت مختصات جدید لایه
      let param = [
        {
          key: "style",
          subKey: "left",
          value: e.x - book_box.x + offsetMouseX,
        },
        {
          key: "style",
          subKey: "top",
          value: e.y - book_box.y + offsetMouseY,
        },
      ];
      this.$store.commit("coverLayers/updateLayers", param);
    });
    //هر زمان موس رها شد
    document.addEventListener("mouseup", () => {
      this.isDrawing = false;
    });
  },
};
</script>

<style lang="scss">
@import "~assets/scss/mixins.scss";
@import "~assets/scss/functions.scss";
@import "~assets/scss/variable.scss";
#project_main_box {
  height: calcMainHeight($panel-header-height, 0px, 0px);
  //کادر اصلی
  #book_box {
    border: 1px solid $lightGray;
    //لایه ها
    & > div {
      .icons-parent-div {
        left: -1px;
        bottom: 100%;
        background-color: $info;
        //آیکون ها
        & > div {
          padding: 0 5px;
          border-radius: 3px 3px 0 0;
          margin-right: 1px;
          color: white;
          &:hover {
            background-color: $darkInfo;
          }
        }
      }
    }
    // قسمت اصلی لایه های متن و عکس
    & > div input,
    & > div img {
      border: none;
      outline: none;
      background: inherit;
      color: inherit;
      text-align: inherit;
      font-weight: inherit;
      overflow: hidden;
    }
    //کادر اصلی انتخاب شده باشد
    &.selected {
      overflow: hidden;
    }
    //کادر یا لایه انتخاب شده
    &.selected,
    & > div.selected {
      border: 1px solid $lightInfo;
      box-shadow: 0 0 4px 0 $info;
      // تگ پدر آیکون ها
      & > .icons-parent-div {
        display: flex !important;
      }
    }
  }
}
</style>