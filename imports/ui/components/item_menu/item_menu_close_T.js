import { Template } from "meteor/templating";
import { routeBack } from "/imports/util/client/client-functions.js";
import "./item_menu_close_T.html";


Template.item_menu_close_T.events({
  "click #button-close": () => {
    routeBack();
  },
});
