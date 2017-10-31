import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { formatDate, getCollectionFromRoute } from "/imports/util/client/client-functions.js";


Template.registerHelper("isDirtyGH", () => Session.get("isDirty"));


Template.registerHelper("isEditModeGH", () => Session.get("isEditMode"));


Template.registerHelper("isAddingModeGH", () => FlowRouter.current().route.name.split(".").reverse()[0] === "add");


Template.registerHelper("setRequiredGH", (fieldName) => {
  let returnValue = "";
  if (Session.equals("isEditMode", true)) {
    const collection = getCollectionFromRoute();
    returnValue = collection.simpleSchema().getDefinition(fieldName, ["optional"]).optional ? "" : "required";
  }
  return returnValue;
});


Template.registerHelper("setDisabledAttributeGH", () => (Session.equals("isEditMode", true) ? "" : "disabled"));


Template.registerHelper("formatDateGH", date => (typeof date === "undefined" ? "brak" : formatDate(date)));
