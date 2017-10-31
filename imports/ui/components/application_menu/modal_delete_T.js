import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { routeBack } from "/imports/util/client/client-functions.js";
import "./modal_delete_T.html";


Template.modal_delete_T.rendered = () => {
  $("#modal-delete").modal({
    dismissible: false,
    opacity: 0.8,
  });
};


Template.modal_delete_T.events({
  "click #button-delete-confirm": () => {
    Meteor.call(FlowRouter.current().route.group.name.concat(".remove"), FlowRouter.getParam("_id"), (error) => {
      if (error) {
        $("#modal-delete-error").modal("open");
      } else {
        routeBack();
        $("#modal-delete").modal("close");
      }
    });
  },
});
