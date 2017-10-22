import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "./modal_dirty_T.html";


Template.modal_dirty_T.rendered = () => {
  $("#modal-dirty").modal({
    dismissible: false,
    opacity: 0.8,
  });
};
