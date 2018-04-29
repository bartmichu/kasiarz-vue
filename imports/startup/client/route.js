import { Meteor } from "meteor/meteor";
import Vue from "vue";
import VueRouter from "vue-router";
// import VueMeteorTracker from "vue-meteor-tracker";
import Vuetify from "vuetify/dist/vuetify";
import "vuetify/dist/vuetify.min.css";
import store from "/imports/startup/client/store";

import ApplicationLayout from "/imports/ui/layouts/ApplicationLayout.vue";
import ApplicationPage from "/imports/ui/pages/ApplicationPage.vue";
import LoginPage from "/imports/ui/pages/LoginPage.vue";

Vue.use(VueRouter);
// Vue.use(VueMeteorTracker);
Vue.use(Vuetify);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "application",
      component: ApplicationPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.loggedIn) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

Meteor.startup(() => {
  new Vue({
    router,
    render: h => h(ApplicationLayout)
  }).$mount("app");
});

export default router;
