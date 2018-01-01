import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "/public/semantic/semantic.min.js";
import "./modal_dirty_T.html";


Template.modal_dirty_T.rendered = () => {
  $("#modal-dirty").modal("setting", "closable", false).modal("setting", "duration", 100);
};
