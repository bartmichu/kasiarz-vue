import { formatDateLong } from "/imports/startup/client/filters/dateFilters.js";

export default {
  install(Vue) {
    Vue.filter("formatDateLong", formatDateLong);
  }
};
