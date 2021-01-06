<template>
  <div class="overflow-hidden">
    <panel-header />
    <div id="project_container">
      <div class="project-sidebar border-left">
        <panel-sidebar>
          <b-row
            slot="slider_header"
            id="sidebar_header"
            class="font-12 border-bottom py-2 m-0"
          >
            <b-col cols="6">صفحات</b-col>
            <b-col
              cols="6"
              class="text-left text-primary cpo"
              @click="createPage"
            >
              <i class="far fa-file font-14"></i>
              ایجاد صفحه جدید
            </b-col>
          </b-row>
          <b-col
            slot="slider_main"
            cols="6"
            class="d-inline-block my-2 cpo"
            :title="page.text"
            v-for="page in pages"
            :key="page.id"
            @click="changeSelected(page.id)"
          >
            <span
              :class="[
                'sidebar-page',
                'd-block',
                'border',
                'col-10',
                'm-auto',
                page.style.background,
                { active: page.id == activePage },
              ]"
            />
            <span
              :class="[
                'd-block',
                'mt-1 text-center',
                'font-12',
                page.id == activePage ? 'text-dark' : 'text-secondary',
              ]"
              >{{ page.name }}
            </span>
          </b-col>
        </panel-sidebar>
      </div>
      <div id="project_pages">
        <paper-pages />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMounted } from "vuex";
export default {
  methods: {
    ...mapActions("pages", ["createPage"]),
    changeSelected(id) {
      this.$store.commit("pages/changeSelected", id);
    },
  },
  computed: {
    ...mapGetters("pages", {
      pages: "getpages",
      activePage: "getSelectId",
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
  #project_pages {
    width: calcMainWidth();
  }
  //sidebar
  #sidebar_header {
    height: $sidebar-header-height;
    overflow: hidden;
  }
}
</style>