import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "/public/semantic/semantic.min.js";
import "./modal_delete_error_T.html";


Template.modal_delete_error_T.rendered = () => {
  $("#modal-delete-error").modal("setting", "closable", false).modal("setting", "duration", 100);
};
