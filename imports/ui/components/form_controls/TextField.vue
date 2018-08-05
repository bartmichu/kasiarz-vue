<template>
  <v-text-field :label="label" box flat placeholder=" " background-color="white" :disabled="disabled" />
</template>


<script>
export default {
  name: "TextField",

  props: {
    label: {
      type: String,
      required: false,
      default: ""
    },
    disabled: {
      type: Boolean,
      required: false,
      default: true
    }
  }
};
</script>
