import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";
import { $ } from "meteor/jquery";
import { resetSessionVariables } from "/imports/util/client/client-functions.js";
import "/imports/ui/components/application_menu/modal_delete_T.js";
import "/imports/ui/components/application_menu/modal_delete_error_T.js";
import "./application_menu_T.html";


Template.application_menu_T.rendered = () => {
  $("#dropdown-button-settings").dropdown({
    constrainWidth: false,
    hover: false,
    belowOrigin: true,
    alignment: "left",
  });
  $("#dropdown-button-user").dropdown({
    constrainWidth: false,
    hover: false,
    belowOrigin: true,
    alignment: "left",
  });
};


Template.application_menu_T.helpers({
  // TODO: zaimplementować w Materialize
  setDisabledIfDirtyH() {
    return Session.equals("isDirty", true) ? "disabled" : "";
  },
});


Template.application_menu_T.events({
  "click a": (event) => {
    event.preventDefault();
  },
  "click #item-manufacturers": () => {
    FlowRouter.go("manufacturers");
  },
  "click #item-models": () => {
    FlowRouter.go("models");
  },
  "click #item-logout": () => {
    FlowRouter.go("index");
    Meteor.logout();
    resetSessionVariables();
  },
});
