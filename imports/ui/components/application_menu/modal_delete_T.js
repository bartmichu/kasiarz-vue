import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { routeBack } from "/imports/util/client/client-functions.js";
import "/public/semantic/semantic.min.js";
import "./modal_delete_T.html";


Template.modal_delete_T.rendered = () => {
  $("#modal-delete").modal({
    onApprove() {
      Meteor.call(FlowRouter.current().route.group.name.concat(".remove"), FlowRouter.getParam("_id"), (error) => {
        if (error) {
          $("#modal-delete-error").modal("show");
        } else {
          routeBack();
        }
      });
    },
  }).modal("setting", "closable", false).modal("setting", "duration", 100);
};
