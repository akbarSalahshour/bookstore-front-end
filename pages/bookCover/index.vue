<template>
  <div class="overflow-hidden" @click="removeAllActive">
    <panel-header />
    <div id="project_container">
      <div class="project-sidebar border-left">
        <panel-sidebar>
          <!-- هدر سایدبار -->
          <b-row
            slot="slider_header"
            id="sidebar_header"
            class="font-12 border-bottom py-2 m-0"
          >
            <b-col cols="6">تنظیمات </b-col>
            <b-col
              cols="6"
              class="text-left text-primary cursor-pointer"
              @click="createLayer"
            >
              <i class="far fa-plus-square font-14"></i>
              ایجاد لایه جدید
            </b-col>
          </b-row>
          <!-- تنظیمات قسمت سایدبار -->
          <b-row slot="slider_main" class="m-0">
            <!-- عرض -->
            <cover-sidebar
              :value="getStyleValue('width')"
              title="عرض"
              name="width"
              type="text"
              @change="updateLayerValue"
            />
            <!-- عرض -->
            <!-- ارتفاع -->
            <cover-sidebar
              :value="getStyleValue('height')"
              title="ارتفاع"
              name="height"
              type="text"
              @change="updateLayerValue"
            />
            <!-- ارتفاع -->
            <!-- اندازه فونت -->
            <cover-sidebar
              v-if="selectedLayer.id != 0"
              :value="getStyleValue('fontSize')"
              title="اندازه فونت"
              name="fontSize"
              type="select"
              @change="updateLayerValue"
            >
              <option
                slot="options"
                v-for="num in 11"
                :key="num"
                :value="num * 2 + 8"
                :class="classFontSize(num * 2 + 8)"
                v-text="num * 2 + 8"
              />
            </cover-sidebar>
            <!-- اندازه فونت -->
            <!-- رنگ متن -->
            <cover-sidebar
              v-if="selectedLayer.id != 0"
              title="رنگ متن"
              name="color"
            >
              <div
                slot="otherItem"
                class="position-relative col-6 text-center border border-secondary rounded"
                :style="{
                  height: '25px',
                  backgroundColor: getStyleValue('color'),
                }"
                @click.stop="colorActive = true"
              >
                <chrome-picker
                  ref="colorElement"
                  :class="[
                    'chrome-picker-box',
                    'position-absolute',
                    colorActive ? 'active' : '',
                  ]"
                  :value="getStyleValue('color')"
                  v-model="colorValue"
                  @input="
                    updateLayerValue({
                      event: $event,
                      value: colorValue.hex8,
                      name: 'color',
                    })
                  "
                />
              </div>
            </cover-sidebar>
            <!-- رنگ متن -->
            <!-- ضخامت فونت -->
            <cover-sidebar
              v-if="selectedLayer.id != 0"
              :value="getStyleValue('fontWeight')"
              title="ضخامت فونت"
              name="fontWeight"
              type="select"
              @change="updateLayerValue"
            >
              <option
                slot="options"
                v-for="(fontWeight, index) in fontWeightes"
                :key="index"
                :value="fontWeight.value"
                :class="classFontWeight(fontWeight.value)"
                v-text="fontWeight.text"
              />
            </cover-sidebar>
            <!-- ضخامت فونت -->
            <!-- مکان متن -->
            <cover-sidebar
              v-if="selectedLayer.id != 0"
              :value="getStyleValue('textAlign')"
              title="مکان متن"
              name="textAlign"
              type="select"
              @change="updateLayerValue"
            >
              <option
                slot="options"
                v-for="(textAlign, index) in textAlignes"
                :key="index"
                :value="textAlign.value"
                v-text="textAlign.text"
              />
            </cover-sidebar>
            <!-- مکان متن -->
            <!-- امتیاز لایه -->
            <cover-sidebar
              v-if="selectedLayer.id != 0"
              :value="getStyleValue('zIndex')"
              title="امتیاز لایه"
              name="zIndex"
              type="text"
              @change="updateLayerValue"
            />
            <!-- امتیاز لایه -->
            <!-- رنگ پس زمینه -->
            <cover-sidebar title="رنگ پس زمینه" name="backgroundColor">
              <div
                slot="otherItem"
                class="position-relative col-6 text-center border border-secondary rounded"
                :style="{
                  height: '25px',
                  backgroundColor: getStyleValue('backgroundColor'),
                }"
                @click.stop="backgroundColorActive = true"
              >
                <chrome-picker
                  ref="backgroundColorElement"
                  :class="[
                    'chrome-picker-box',
                    'position-absolute',
                    backgroundColorActive ? 'active' : '',
                  ]"
                  :value="getStyleValue('backgroundColor')"
                  v-model="backgroundColorValue"
                  @input="
                    updateLayerValue({
                      event: $event,
                      value: backgroundColorValue.hex8,
                      name: 'backgroundColor',
                    })
                  "
                />
              </div>
            </cover-sidebar>
            <!-- رنگ پس زمینه -->
            <!-- عکس پس زمینه -->
            <cover-sidebar name="backgroundImage">
              <b-row class="m-0" slot="otherItem">
                <input
                  ref="backgroundImageElement"
                  class="col-12 border-none font-14 p-0"
                  type="file"
                  @change="
                    updateLayerValue({
                      event: $event,
                      value: null,
                      name: 'backgroundImage',
                    })
                  "
                />
                <b-col
                  class="col-11 h-100 background-size-100 mx-auto mt-3"
                  v-if="getStyleValue('backgroundImage')"
                  :style="{ backgroundImage: getStyleValue('backgroundImage') }"
                />
              </b-row>
            </cover-sidebar>
            <!-- عکس پس زمینه -->
          </b-row>
        </panel-sidebar>
      </div>
      <div id="project_layers">
        <cover-layer />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { Chrome } from "vue-color";
export default {
  components: {
    "chrome-picker": Chrome,
  },
  data() {
    return {
      colorActive: false,
      backgroundColorActive: false,
      colorValue: "#000",
      backgroundColorValue: "#fff",
    };
  },
  methods: {
    //بستن باکس رنگ
    removeAllActive() {
      this.colorActive = false;
      this.backgroundColorActive = false;
    },
    ...mapActions("coverLayers", ["createLayer"]),
    //نمایش انواع ضخامت با مقدار مشابه
    classFontWeight: (value) => `font-weight-${value}`,
    //نمایش انواع سایز با مقدار مشابه
    classFontSize: (value) => `font-${value}`,
    getStyleValue(style) {
      return this.selectedLayer.style.find((item) => item.name == style).value;
    },
    updateLayerValue(args) {
      let withParam = null;
      switch (args["name"]) {
        case "backgroundImage":
          const file = args["event"].target.files[0];
          if (file) {
          //اگر فایل بود قرار بده
			args["value"] = `url('${URL.createObjectURL(file)}')`;
			//تغییر نوع لایه به عکس
            withParam = {
              key: "type",
              value: "image",
            };
          } else {
			  //حذف مقدار قبلی
			  //تغییر نوع لایه به متن
            args["value"] = "";
            withParam = {
              key: "type",
              value: "text",
            };
          }
          break;
        //width با flex باید یکسان باشد.
        case "width":
          withParam = {
            key: "style",
            subKey: "flex",
            value: `0 0 ${args["value"]}cm`,
          };
          break;
      }
      let param = [
        {
          key: "style",
          subKey: args["name"],
          value: args["value"],
        },
      ];
      if (withParam) param.push(withParam);
      this.$store.commit("coverLayers/updateLayers", param);
    },
  },
  computed: {
    ...mapGetters("coverLayers", {
      selectedLayer: "getSelectedLayer",
      fontWeightes: "getFontWeightes",
      textAlignes: "getTextAlignes",
    }),
  },
};
</script>
<style lang="scss">
@import "~assets/scss/variable.scss";
@import "~assets/scss/functions.scss";
#project_container {
  width: 100vw;
  overflow: hidden;
  display: flex;
  .project-sidebar {
    width: $sidebar-header-width;
  }
  #project_layers {
    width: calcMainWidth();
  }
  #sidebar_header {
    height: $sidebar-header-height;
    overflow: hidden;
  }
}
</style>