<template>
  <div>
    <b-row class="font-12 border-bottom py-2 m-0">
      <b-col cols="6">صفحات</b-col>
      <b-col cols="6" class="text-left text-primary cpo" @click="createPage">
        <i class="far fa-file font-14"></i>
        ایجاد صفحه جدید
      </b-col>
    </b-row>
    <div id="container_sidebar" class="webkit-scrollbar overflow-y m-0">
      <b-col
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
            `bg-${page.style.background}`,
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
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activePage: 0,
    };
  },
  methods: {
    createPage() {
      this.$store.dispatch("pages/createPage").then((response) => {
        this.activePage = response;
      });
    },
    changeSelected(id) {
      this.activePage = id;
      this.$store.commit("pages/changeSelected", id);
    },
  },
  computed: {
    ...mapGetters("pages", {
      pages: "getpages",
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/variable.scss";
@import "~assets/scss/mixins.scss";
#container_sidebar {
  height: calc(100vh - 35px - 47px);
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