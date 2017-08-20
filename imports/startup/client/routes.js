import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
import "/imports/ui/layouts/body_T.js";


FlowRouter.route("/", {
  name: "app.root",
  action() {
    BlazeLayout.render("body_T", {
      app_menu_section: "",
      app_main_section: "",
    });
  },
});
