import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "./modal_save_error_T.html";


Template.modal_save_error_T.rendered = () => {
  $("#modal-save-error").modal({
    dismissible: false,
    opacity: 0.8,
  });
};
