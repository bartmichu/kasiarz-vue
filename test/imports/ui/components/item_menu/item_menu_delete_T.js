import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "./item_menu_delete_T.html";


Template.item_menu_delete_T.events({
  "click #button-delete": () => {
    $("#modal-delete").modal("show");
  },
});
