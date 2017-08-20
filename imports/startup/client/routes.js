import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
import "/imports/ui/layouts/body_T.js";
import "/imports/ui/pages/login_T.js";
import "/imports/ui/pages/placeholder_T.js";


function redirectIfLoggedIn(context, redirect) {
  if (Meteor.userId() !== null) {
    // TODO: przekierowanie pod ostatnio odwiedzony url?
    redirect("/");
  }
}


FlowRouter.route("/", {
  name: "index",
  action() {
    BlazeLayout.render("body_T", {
      app_menu_section: "",
      app_main_section: "placeholder_T",
    });
  },
});


FlowRouter.route("/logowanie", {
  name: "logowanie",
  triggersEnter: [redirectIfLoggedIn],
  action() {
    BlazeLayout.render("body_T", {
      app_menu_section: "",
      app_main_section: "login_T",
    });
  },
});
