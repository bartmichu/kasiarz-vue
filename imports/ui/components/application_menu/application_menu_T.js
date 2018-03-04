import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { resetSessionVariables } from "/imports/util/client/client-functions.js";
import "/public/semantic/semantic.min.js";
import "/imports/ui/components/application_menu/modal_dirty_T.js";
import "/imports/ui/components/application_menu/modal_delete_T.js";
import "/imports/ui/components/application_menu/modal_delete_error_T.js";
import "/imports/ui/components/application_menu/modal_save_error_T.js";
import "./application_menu_T.html";


Template.application_menu_T.onCreated(() => { });


Template.application_menu_T.rendered = () => {
  $("#dropdown__button-settings").dropdown();
  $("#dropdown__button-user").dropdown();
};


Template.application_menu_T.helpers({
  connectionStatusIndicatorH() {
    const status = Meteor.status().status;
    let className = "";
    switch (status) {
      case "connected":
        className = "";
        break;
      case "connecting":
        className = "yellow";
        break;
      case "failed":
        className = "red";
        break;
      case "waiting":
        className = "yellow";
        break;
      case "offline":
        className = "red";
        break;
      default:
        break;
    }
    return className;
  },
});


Template.application_menu_T.events({
  "click a": (event) => {
    event.preventDefault();
  },
  "click #item-clients": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("show");
    } else {
      FlowRouter.go("clients");
    }
  },
  "click #item-manufacturers": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("show");
    } else {
      FlowRouter.go("manufacturers");
    }
  },
  "click #item-models": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("show");
    } else {
      FlowRouter.go("models");
    }
  },
  "click #item-offices": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("show");
    } else {
      FlowRouter.go("offices");
    }
  },
  "click #item-shops": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("show");
    } else {
      FlowRouter.go("shops");
    }
  },
  "click #item-employees": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("show");
    } else {
      FlowRouter.go("employees");
    }
  },
  "click #item-logout": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("show");
    } else {
      FlowRouter.go("index");
      Meteor.logout();
      resetSessionVariables();
    }
  },
});
