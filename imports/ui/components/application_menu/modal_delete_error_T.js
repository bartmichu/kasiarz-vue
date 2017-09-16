import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "./modal_delete_error_T.html";


Template.modal_delete_error_T.rendered = () => {
  $("#modal-delete-error").modal({
    dismissible: false,
    opacity: 0.8,
  });
};


Template.modal_delete_error_T.events({
  "click #button-delete-error-confirm": () => {
    $("#modal-delete-error").modal("close");
    $("#modal-delete").modal("close");
  },
});
