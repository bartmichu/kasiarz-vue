<template>
  <v-textarea :label="getLabel" box flat :placeholder="getPlaceholder" background-color="white" :disabled="disabled" />
</template>


<script>
export default {
  name: "TextArea",

  props: {
    label: {
      type: String,
      required: false,
      default: ""
    },
    placeholder: {
      type: String,
      required: false,
      default: " "
    },
    disabled: {
      type: Boolean,
      required: false,
      default: true
    },
    schema: {
      type: Object,
      required: false,
      default: null
    }
  },

  computed: {
    getLabel() {
      const labelText =
        Object.keys(this.$options.propsData).includes("schema") &&
        typeof this.schema.label !== "undefined"
          ? this.schema.label
          : this.label;

      const labelSuffix =
        Object.keys(this.$options.propsData).includes("schema") &&
        this.schema.optional !== true
          ? " (wymagane)"
          : "";

      return this.disabled ? labelText : labelText.concat(labelSuffix);
    },
    getPlaceholder() {
      return this.placeholder;
    }
  }
};
</script>
