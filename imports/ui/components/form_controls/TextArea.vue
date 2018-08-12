<template>
  <v-textarea :label="getLabel" box flat :placeholder="placeholder" :background-color="getBackgroundColor" :disabled="disabled" @focus="toggleFocus(true)" @blur="toggleFocus(false)" />
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

  data() {
    return {
      isFocused: false
    };
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
    getBackgroundColor() {
      return this.isFocused ? "yellow" : "white";
    }
  },

  methods: {
    toggleFocus(state) {
      if (typeof state === "undefined") {
        this.isFocused = !this.isFocused;
      } else {
        this.isFocused = state;
      }
    }
  }
};
</script>
