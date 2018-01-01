import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { resetSessionVariables } from "/imports/util/client/client-functions.js";
import Shops from "/imports/api/shops/shops.js";
import "/public/semantic/semantic.min.js";
import "/imports/ui/components/application_menu/modal_dirty_T.js";
import "/imports/ui/components/application_menu/modal_delete_T.js";
import "/imports/ui/components/application_menu/modal_delete_error_T.js";
import "/imports/ui/components/application_menu/modal_save_error_T.js";
import "./application_menu_T.html";


Template.application_menu_T.onCreated(() => {
  Template.instance().subscribe("shops.private");
});


Template.application_menu_T.rendered = () => {
  $("#dropdown-button-settings").dropdown();
  $("#dropdown-button-user").dropdown();
};


Template.application_menu_T.helpers({});


Template.application_menu_T.events({
  "click a": (event) => {
    event.preventDefault();
  },
  "click #item-manufacturers": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("open");
    } else {
      FlowRouter.go("manufacturers");
    }
  },
  "click #item-models": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("open");
    } else {
      FlowRouter.go("models");
    }
  },
  "click #item-offices": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("open");
    } else {
      FlowRouter.go("offices");
    }
  },
  "click #item-shop": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("open");
    } else {
      FlowRouter.go("shops.shop", { _id: Shops.findOne({})._id });
    }
  },
  "click #item-logout": () => {
    if (Session.equals("isDirty", true)) {
      $("#modal-dirty").modal("open");
    } else {
      FlowRouter.go("index");
      Meteor.logout();
      resetSessionVariables();
    }
  },
});
