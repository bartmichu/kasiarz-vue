import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";
import { getAddingModeFromRoute, setEditMode, routeBack } from "/imports/util/client/client-functions.js";
import "./item_menu_cancel_T.html";


Template.item_menu_cancel_T.onCreated(() => {
  Template.instance().isAddingMode = getAddingModeFromRoute();
});


Template.item_menu_cancel_T.helpers({
  buttonTextH() {
    return Template.instance().isAddingMode ? "anuluj dodawanie" : "anuluj zmiany";
  },
});


Template.item_menu_cancel_T.events({
  "click #button-cancel": () => {
    setEditMode(false);
    if (Template.instance().isAddingMode) {
      routeBack();
    } else {
      // TODO: wypelnianie danych formularza
      const context = FlowRouter.current().route.group.name;
      switch (context) {
        case "offices": {
          break;
        }
        case "manufacturers": {
          break;
        }
        case "models": {
          break;
        }
        default:
          break;
      }
    }
  },
});