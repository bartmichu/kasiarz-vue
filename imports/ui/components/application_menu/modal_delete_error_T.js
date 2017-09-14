import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "./modal_delete_error_T.html";


Template.modal_delete_error_T.rendered = () => {
  $("#modal-delete-error").modal({
    dismissible: false,
    opacity: 0.8,
  });
};
