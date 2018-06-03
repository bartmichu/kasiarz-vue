import { Meteor } from "meteor/meteor";
import Vue from "vue";
import VueRouter from "vue-router";
import VueMeteorTracker from "vue-meteor-tracker";
import Vuetify from "vuetify/dist/vuetify";
import "vuetify/dist/vuetify.min.css";
import isLoggedIn from "/imports/helpers/client/isLoggedIn.js";

import ApplicationLayout from "/imports/ui/layouts/ApplicationLayout.vue";
import ApplicationPage from "/imports/ui/pages/ApplicationPage.vue";
import LoginPage from "/imports/ui/pages/login/LoginPage.vue";
import ClientsPage from "/imports/ui/mockups/ClientsPage.vue";
import DevicesPage from "/imports/ui/mockups/DevicesPage.vue";
import ManufacturersListPage from "/imports/ui/pages/manufacturers/ManufacturersListPage.vue";
import ManufacturerPage from "/imports/ui/pages/manufacturers/ManufacturerPage.vue";
import ModelsPage from "/imports/ui/mockups/ModelsPage.vue";
import ShopsPage from "/imports/ui/mockups/ShopsPage.vue";
import EmployeesPage from "/imports/ui/mockups/EmployeesPage.vue";
import OfficesPage from "/imports/ui/mockups/OfficesPage.vue";

import store from "/imports/startup/client/store.js";

Vue.use(VueRouter);
Vue.use(VueMeteorTracker);
Vue.use(Vuetify);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: ApplicationPage,
      children: [
        {
          path: "klienci",
          name: "clients",
          component: ClientsPage
        },
        {
          path: "urzadzenia",
          name: "devices",
          component: DevicesPage
        },
        {
          path: "producenci",
          name: "manufacturers",
          component: ManufacturersListPage
        },
        {
          path: "producent/:id",
          name: "manufacturer",
          component: ManufacturerPage
        },
        {
          path: "modele",
          name: "models",
          component: ModelsPage
        },
        {
          path: "serwisy",
          name: "shops",
          component: ShopsPage
        },
        {
          path: "serwisanci",
          name: "employees",
          component: EmployeesPage
        },
        {
          path: "urzedy",
          name: "offices",
          component: OfficesPage
        }
      ]
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
    store,
    render: h => h(ApplicationLayout)
  }).$mount("app");
});

export default router;
