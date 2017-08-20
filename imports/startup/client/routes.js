import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
import "/imports/ui/layouts/body_T.js";
import "/imports/ui/pages/login_T.js";


FlowRouter.route("/", {
  name: "index",
  action() {
    BlazeLayout.render("body_T", {
      app_menu_section: "",
      app_main_section: "login_T",
    });
  },
});
