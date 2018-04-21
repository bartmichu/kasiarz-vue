import { Template } from "meteor/templating";
import { setEditMode } from "/imports/util/client/client-functions.js";
import "./item_menu_edit_T.html";


Template.item_menu_edit_T.events({
  "click #button-edit": () => {
    setEditMode(true);
  },
});
