import { Meteor } from "meteor/meteor";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify/dist/vuetify";
import "vuetify/dist/vuetify.min.css";
import isLoggedIn from "/imports/helpers/client/isLoggedIn";

import ApplicationLayout from "/imports/ui/layouts/ApplicationLayout.vue";
import ApplicationPage from "/imports/ui/pages/ApplicationPage.vue";
import LoginPage from "/imports/ui/pages/LoginPage.vue";

Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: ApplicationPage
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: {
        public: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.public)) {
    next();
  } else {
    isLoggedIn().then(
      response => (response ? next() : next({ name: "login" }))
    );
  }
});

Meteor.startup(() => {
  new Vue({
    router,
    render: h => h(ApplicationLayout)
  }).$mount("app");
});

export default router;
