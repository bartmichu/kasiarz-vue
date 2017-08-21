import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";
import { $ } from "meteor/jquery";
import { setSessionVariables } from "/imports/startup/client/client-functions.js";
import "./application_menu_T.html";


Template.application_menu_T.rendered = () => {
  $("#dropdown-konfiguracja").dropdown();
  $("#dropdown-uzytkownik").dropdown();
};


Template.application_menu_T.helpers({
  setDisabledIfDirtyH() {
    return Session.equals("isDirty", true) ? "disabled" : "";
  },
});


Template.application_menu_T.events({
  "click a": (event) => {
    event.preventDefault();
  },
  "click #pozycja-urzedy": () => {
    FlowRouter.go("urzedy");
  },
  "click #pozycja-producenci": () => {
    FlowRouter.go("producenci");
  },
  "click #pozycja-modele": () => {
    FlowRouter.go("modele");
  },
  "click #pozycja-wyloguj": () => {
    FlowRouter.go("index");
    Meteor.logout();
    setSessionVariables();
  },
});
