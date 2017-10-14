import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import { FlowRouter } from "meteor/kadira:flow-router";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";
import { formatDate } from "/imports/util/client/client-functions.js";


Template.registerHelper("isDirtyGH", () => Session.get("isDirty"));


Template.registerHelper("isEditModeGH", () => Session.get("isEditMode"));


Template.registerHelper("isAddingModeGH", () => FlowRouter.current().route.name.split(".").reverse()[0] === "add");


Template.registerHelper("setRequiredGH", (fieldName) => {
  let returnValue = "";
  if (Session.equals("isEditMode", true)) {
    // TODO: refaktoryzacja
    let collection = null;
    switch (FlowRouter.current().route.group.name) {
      case "models":
        collection = Models;
        break;
      case "manufacturers":
        collection = Manufacturers;
        break;
      default:
        break;
    }
    returnValue = collection.simpleSchema().getDefinition(fieldName, ["optional"]).optional ? "" : "required";
  }
  return returnValue;
});


Template.registerHelper("setDisabledAttributeGH", () => (Session.equals("isEditMode", true) ? "" : "disabled"));


Template.registerHelper("formatDateGH", date => (typeof date === "undefined" ? "brak" : formatDate(date)));
