import filters from "/imports/startup/client/filters/index.js";
import Vue from "vue";
import VueMeteorTracker from "vue-meteor-tracker";
import Vuetify from "vuetify/dist/vuetify";

Vue.use(VueMeteorTracker);
Vue.use(Vuetify);
Vue.use(filters);
