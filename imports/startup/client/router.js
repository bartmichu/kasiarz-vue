import "vuetify/dist/vuetify.min.css";
import "/imports/ui/css/override.css";
import { Meteor } from "meteor/meteor";
import TheLayout from "/imports/ui/TheLayout.vue";
import ThePage from "/imports/ui/ThePage.vue";
import ClientsPage from "/imports/ui/mockups/ClientsPage.vue";
import DevicesPage from "/imports/ui/mockups/DevicesPage.vue";
import EmployeesPage from "/imports/ui/mockups/EmployeesPage.vue";
import isLoggedIn from "/imports/helpers/client/isLoggedIn.js";
import LoginPage from "/imports/ui/login/LoginPage.vue";
import ManufacturersItemPage from "/imports/ui/manufacturers/ManufacturersItemPage.vue";
import ManufacturersListPage from "/imports/ui/manufacturers/ManufacturersListPage.vue";
import ModelsPage from "/imports/ui/mockups/ModelsPage.vue";
import OfficesPage from "/imports/ui/mockups/OfficesPage.vue";
import ShopsPage from "/imports/ui/mockups/ShopsPage.vue";
import store from "/imports/startup/client/store.js";
import Vue from "vue";
import VueRouter from "vue-router";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: ThePage,
      children: [
        {
          path: "klienci",
          name: "clients",
          component: ClientsPage,
          meta: {
            methodPrefix: "clients"
          }
        },
        {
          path: "urzadzenia",
          name: "devices",
          component: DevicesPage,
          meta: {
            methodPrefix: "devices"
          }
        },
        {
          path: "producenci",
          name: "manufacturers",
          component: ManufacturersListPage,
          meta: {
            methodPrefix: "manufacturers"
          },
          children: [
            {
              path: ":mongoId",
              name: "manufacturer",
              component: ManufacturersItemPage,
              props: true,
              meta: {
                methodPrefix: "manufacturers"
              }
            }
          ]
        },
        {
          path: "modele",
          name: "models",
          component: ModelsPage,
          meta: {
            methodPrefix: "models"
          }
        },
        {
          path: "serwisy",
          name: "shops",
          component: ShopsPage,
          meta: {
            methodPrefix: "shops"
          }
        },
        {
          path: "serwisanci",
          name: "employees",
          component: EmployeesPage,
          meta: {
            methodPrefix: "employees"
          }
        },
        {
          path: "urzedy",
          name: "offices",
          component: OfficesPage,
          meta: {
            methodPrefix: "offices"
          }
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
    render: h => h(TheLayout)
  }).$mount("app");
});

export default router;
