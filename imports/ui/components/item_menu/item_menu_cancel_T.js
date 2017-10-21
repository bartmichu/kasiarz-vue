import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";
import { getAddingModeFromRoute, setEditMode, routeBack, setFormValues } from "/imports/util/client/client-functions.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";
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
      const context = FlowRouter.current().route.group.name;
      let collection = null;
      switch (context) {
        case "offices": {
          break;
        }
        case "manufacturers": {
          collection = Manufacturers;
          break;
        }
        case "models": {
          collection = Models;
          break;
        }
        default:
          break;
      }

      setFormValues(collection.simpleSchema(), collection.findOne({ _id: FlowRouter.getParam("_id") }));
    }
  },
});
