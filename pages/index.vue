<template>
  <main>
    <b-container>
      <div id="animate_line_under" class="col-12 mx-auto my-5 overflow-auto">
		<!-- کادر بالا -->
        <b-row class="flex-nowrap">
          <b-col
            @click="changeCategory($event, index)"
            class="animate-item cursor-pointer"
            v-for="index in 5"
            :key="index"
          >
            <b-col class="category-box mx-auto text-center">
              <img
                :src="categoryImage(index)"
                alt="category.title"
                ref="categoryImg"
              />
              <h3
                :class="[
                  'text-center',
                  'text-nowrap',
                  'font-20',
                  'font-400',
                  'mt-3',
                  'mb-auto',
                  categoryIndex == index ? 'text-info' : 'text-muted',
                ]"
              >
                دسته بندی شماره {{ index }}
              </h3>
            </b-col>
          </b-col>
        </b-row>
		<!-- کادر بالا -->
		<!-- خط بین کادرها -->
        <b-row class="parent-line position-relative rounded-5 my-4">
          <div ref="animateLine" class="line bg-info"></div>
        </b-row>
		<!-- خط بین کادرها -->
		<!-- کادر پایین -->
        <div v-for="category in 5" :key="category">
          <b-row v-if="categoryIndex == category">
            <b-col v-for="index in 5" :key="index" class="text-center">
              <div class="parent-list-img d-flex">
                <img
                  v-b-modal.modal-center
                  class="m-auto cursor-pointer"
                  :src="
                    require(`@/assets/img/list${
                      Math.floor(Math.random() * 5) + 1
                    }.png`)
                  "
                  alt=""
                />
              </div>
              <div class="font-12">
                <h4 class="font-18 font-700 cursor-pointer">
                  مربعی کوچک
                </h4>
                <div class="mb-3" dir="ltr">
                  <div>10×10 in</div>
                  <div>(20×20 cm)</div>
                </div>
                <div>از 5000 هزارتومان برای 50 صفحه</div>
              </div>
            </b-col>
          </b-row>
        </div>
		<!-- کادر پایین -->
      </div>
    </b-container>
    <template>
      <div>
        <b-modal id="modal-center" centered @ok="createProject($event)">
          <b-form-group
            label="نام پروژه"
            label-for="project_name_input"
            :class="errorProjectName ? 'text-danger' : ''"
          >
            <b-form-input
              id="project_name_input"
              v-model="projectName"
              :class="errorProjectName ? 'border-danger' : ''"
              placeholder="نام پروژه را وارد نمایید..."
            ></b-form-input>
          </b-form-group>
          <template #modal-footer="{ ok, cancel }">
            <b-button size="md" variant="success" class="px-5" @click="ok()">
              ایجاد
            </b-button>
            <b-button size="md" variant="danger" @click="cancel()">
              انصراف
            </b-button>
          </template>
        </b-modal>
      </div>
    </template>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "index",
  data() {
    return {
      categoryIndex: -1,
      projectId: null,
      projectName: "",
      errorProjectName: false,
    };
  },
  methods: {
	  //تغییر کادر پایین بر اساس انتخاب کادر بالا
    changeCategory(evt, index) {
      const tab = evt.target.closest(".animate-item");
      const line = this.$refs["animateLine"];
      line.style.left = tab.offsetLeft + "px";
      line.style.width = tab.clientWidth + "px";
      this.categoryIndex = index;
    },
    getImage(path) {
      return require(path);
    },
    createProject(evt) {
      if (this.projectName == "") this.errorProjectName = true;
      else this.$router.push("/project");
      evt.preventDefault();
    },
    categoryImage(index) {
      return require(`@/assets/img/category${index}.png`);
    },
  },
  mounted() {
    this.$refs["categoryImg"][0].click();
    this.projectId = localStorage.getItem("BookstoreProjectId");
  },
  computed: {
    ...mapGetters("category", {
      categories: "getCategories",
    }),
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/variable.scss";
#animate_line_under {
  $border: 6px;
  $borderRadius: 5px;
  .category-box {
    height: 200px;
    img {
      width: 100%;
      height: 80%;
      object-fit: contain;
    }
  }
  .parent-line {
    border-bottom: $border solid $pink;
    border-radius: $borderRadius;
    .line {
      position: absolute;
      transition: left 0.5s ease-in-out, width 0.5s 0.1s;
      height: $border;
      left: 0;
      border-radius: $borderRadius;
      width: 100%;
    }
  }
  .parent-list-img {
    height: 100px;
    img {
      max-height: 100%;
      object-fit: contain;
    }
  }
}
</style>