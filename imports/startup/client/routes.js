import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import "/imports/ui/components/application_menu/application_menu_T.js";
import "/imports/ui/layouts/body_T.js";
import "/imports/ui/pages/login_T.js";
import "/imports/ui/pages/placeholder_T.js";
import "/imports/ui/pages/manufacturers_T.js";
import "/imports/ui/pages/manufacturers_item_T.js";
import "/imports/ui/pages/models_T.js";
import "/imports/ui/pages/models_item_T.js";
import "/imports/ui/pages/offices_T.js";
import "/imports/ui/pages/offices_item_T.js";
import "/imports/ui/pages/shops_item_T.js";


function setPreviousUrl() {
  const previousUrl = Session.get("previousUrl");
  const currentUrl = FlowRouter.current().path.split("?")[0];
  Session.set("previousUrl", previousUrl === currentUrl ? previousUrl : currentUrl);
}


FlowRouter.triggers.exit([setPreviousUrl]);


function redirectIfLoggedIn(context, redirect) {
  if (Meteor.userId() !== null) {
    // TODO: przekierowanie pod ostatnio odwiedzony url?
    redirect("/");
  }
}


FlowRouter.route("/", {
  name: "index",
  action() {
    this.render("body_T", "placeholder_T", {
      app_menu_section: "application_menu_T",
    });
  },
});


FlowRouter.route("/logowanie", {
  name: "login",
  triggersEnter: [redirectIfLoggedIn],
  action() {
    this.render("body_T", "login_T", {
      app_menu_section: "",
    });
  },
});


const manufacturers = FlowRouter.group({
  prefix: "/producenci",
  name: "manufacturers",
});

manufacturers.route("/", {
  name: "manufacturers",
  action() {
    this.render("body_T", "manufacturers_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

manufacturers.route("/id/:_id", {
  name: "manufacturers.manufacturer",
  action() {
    this.render("body_T", "manufacturers_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

manufacturers.route("/dodaj", {
  name: "manufacturers.add",
  action() {
    this.render("body_T", "manufacturers_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});


const models = FlowRouter.group({
  prefix: "/modele",
  name: "models",
});

models.route("/", {
  name: "models",
  action() {
    this.render("body_T", "models_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

models.route("/id/:_id", {
  name: "models.model",
  action() {
    this.render("body_T", "models_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

models.route("/dodaj", {
  name: "models.add",
  action() {
    this.render("body_T", "models_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});


const shops = FlowRouter.group({
  prefix: "/serwis",
  name: "shops",
});

shops.route("/id/:_id", {
  name: "shops.shop",
  action() {
    this.render("body_T", "shops_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});


const offices = FlowRouter.group({
  prefix: "/urzedy",
  name: "offices",
});

offices.route("/", {
  name: "offices",
  action() {
    this.render("body_T", "offices_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

offices.route("/id/:_id", {
  name: "offices.office",
  action() {
    this.render("body_T", "offices_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

offices.route("/dodaj", {
  name: "offices.add",
  action() {
    this.render("body_T", "offices_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});
