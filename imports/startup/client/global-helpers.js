import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { formatDate, getCollectionFromRoute } from "/imports/util/client/client-functions.js";
import Devices from "/imports/api/devices/devices.js";
import Clients from "/imports/api/clients/clients.js";
import uimap from "/imports/util/client/uimap.js";


Template.registerHelper("isDirtyGH", () => Session.get("isDirty"));


Template.registerHelper("isEditModeGH", () => Session.get("isEditMode"));


Template.registerHelper("isAddingModeGH", () => FlowRouter.current().route.name.split(".").reverse()[0] === "add");


Template.registerHelper("setRequiredGH", (schema, fieldName) => {
  let returnValue = "";
  if (Session.equals("isEditMode", true)) {
    returnValue = schema.getDefinition(fieldName, ["optional"]).optional ? "" : "required";
  }
  return returnValue;
});


Template.registerHelper("setDisabledAttributeGH", () => (Session.equals("isEditMode", true) ? "" : "disabled"));


Template.registerHelper("formatDateGH", date => (typeof date === "undefined" ? "brak" : formatDate(date)));


Template.registerHelper("sectionHeaderTextGH", () => uimap[Session.get("uiSection")].header);


Template.registerHelper("getCollectionSchemaGH", (collection) => {
  let schema = null;

  if (typeof collection === "undefined") {
    return getCollectionFromRoute().simpleSchema();
  }

  switch (collection) {
    case "devices":
      schema = Devices.simpleSchema();
      break;
    case "clients":
      schema = Clients.simpleSchema();
      break;
    default:
      break;
  }

  return schema;
});


Template.registerHelper("getFieldSchemaGH", field => getCollectionFromRoute().simpleSchema().getDefinition(field));


Template.registerHelper("getFieldLabelGH", field => getCollectionFromRoute().simpleSchema().label(field));
