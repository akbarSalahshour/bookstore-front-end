<template>
  <b-col cols="12" class="d-flex justify-content-between p-2">
    <span v-if="title" class="font-14 text-secondary text-nowrap">{{
      title
    }}</span>
    <select
      v-if="type == 'select'"
      ref="elementRef"
      class="col-6 text-center p-1 font-12 border border-secondary rounded"
      :value="value"
      @change="changeLayerValue(name)"
    >
      <slot name="options" />
    </select>
    <input
      v-else-if="type == 'text'"
      ref="elementRef"
      class="col-6 text-center border border-secondary rounded p-0"
      type="number"
      :value="value"
      @change="changeLayerValue($event)"
    />
    <slot name="otherItem" />
  </b-col>
</template>
<script>
export default {
  props: ["title", "name", "value", "type"],
  methods: {
    changeLayerValue() {
      let elementValue = this.$refs["elementRef"].value;
      this.$emit("change", {
        name: this.name,
        value: elementValue,
      });
    },
  },
};
</script>