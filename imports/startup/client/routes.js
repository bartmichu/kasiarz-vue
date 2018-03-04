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
import "/imports/ui/pages/shops_T.js";
import "/imports/ui/pages/shops_item_T.js";
import "/imports/ui/pages/employees_T.js";
import "/imports/ui/pages/employees_item_T.js";
import "/imports/ui/pages/clients_T.js";
import "/imports/ui/pages/clients_item_T.js";


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
    Session.set("uiSection", "index");
    this.render("body_T", "placeholder_T", {
      app_menu_section: "application_menu_T",
    });
  },
});


FlowRouter.route("/logowanie", {
  name: "login",
  triggersEnter: [redirectIfLoggedIn],
  action() {
    Session.set("uiSection", "login");
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
    Session.set("uiSection", "manufacturers");
    this.render("body_T", "manufacturers_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

manufacturers.route("/id/:_id", {
  name: "manufacturers.manufacturer",
  action() {
    Session.set("uiSection", "manufacturer");
    this.render("body_T", "manufacturers_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

manufacturers.route("/dodaj", {
  name: "manufacturers.add",
  action() {
    Session.set("uiSection", "manufacturer");
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
    Session.set("uiSection", "models");
    this.render("body_T", "models_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

models.route("/id/:_id", {
  name: "models.model",
  action() {
    Session.set("uiSection", "model");
    this.render("body_T", "models_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

models.route("/dodaj", {
  name: "models.add",
  action() {
    Session.set("uiSection", "model");
    this.render("body_T", "models_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});


const shops = FlowRouter.group({
  prefix: "/serwis",
  name: "shops",
});

shops.route("/", {
  name: "shops",
  action() {
    Session.set("uiSection", "shops");
    this.render("body_T", "shops_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

shops.route("/id/:_id", {
  name: "shops.shop",
  action() {
    Session.set("uiSection", "shop");
    this.render("body_T", "shops_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

shops.route("/dodaj", {
  name: "shops.add",
  action() {
    Session.set("uiSection", "shop");
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
    Session.set("uiSection", "offices");
    this.render("body_T", "offices_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

offices.route("/id/:_id", {
  name: "offices.office",
  action() {
    Session.set("uiSection", "office");
    this.render("body_T", "offices_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

offices.route("/dodaj", {
  name: "offices.add",
  action() {
    Session.set("uiSection", "office");
    this.render("body_T", "offices_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});


const employees = FlowRouter.group({
  prefix: "/serwisanci",
  name: "employees",
});

employees.route("/", {
  name: "employees",
  action() {
    Session.set("uiSection", "employees");
    this.render("body_T", "employees_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

employees.route("/id/:_id", {
  name: "employees.employee",
  action() {
    Session.set("uiSection", "employee");
    this.render("body_T", "employees_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

employees.route("/dodaj", {
  name: "employees.add",
  action() {
    Session.set("uiSection", "employee");
    this.render("body_T", "employees_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});


const clients = FlowRouter.group({
  prefix: "/klienci",
  name: "clients",
});

clients.route("/", {
  name: "clients",
  action() {
    Session.set("uiSection", "clients");
    this.render("body_T", "clients_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

clients.route("/id/:_id", {
  name: "clients.client",
  action() {
    Session.set("uiSection", "client");
    this.render("body_T", "clients_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});

clients.route("/dodaj", {
  name: "clients.add",
  action() {
    Session.set("uiSection", "client");
    this.render("body_T", "clients_item_T", {
      app_menu_section: "application_menu_T",
    });
  },
});
