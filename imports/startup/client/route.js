import { Meteor } from "meteor/meteor";
import Vue from "vue";
import VueRouter from "vue-router";
// import VueMeteorTracker from "vue-meteor-tracker";
import Vuetify from "vuetify/dist/vuetify";
import "vuetify/dist/vuetify.min.css";

import ApplicationLayout from "/imports/ui/layouts/ApplicationLayout.vue";

Vue.use(VueRouter);
// Vue.use(VueMeteorTracker);
Vue.use(Vuetify);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home"
    }
  ]
});

Meteor.startup(() => {
  new Vue({
    router,
    render: h => h(ApplicationLayout)
  }).$mount("app");
});
