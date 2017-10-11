import { Session } from "meteor/session";
import { FlowRouter } from "meteor/kadira:flow-router";
import { $ } from "meteor/jquery";
import { Materialize } from "meteor/materialize:materialize";
import moment from "moment";


const setDirty = state => Session.set("isDirty", state);


const setEditMode = (state) => {
  Session.set("isDirty", false);
  Session.set("isEditMode", state);
};


const getAddingModeFromRoute = () => FlowRouter.current().route.name.split(".").reverse()[0] === "add";


const resetSessionVariables = () => {
  Session.set("previousUrl", "");
  Session.set("isDirty", false);
  Session.set("isEditMode", false);
};


const routeBack = () => {
  FlowRouter.go(Session.get("previousUrl") || "index");
};


const setFormLabels = (schema) => {
  $("label").each((index, element) => {
    const label = $(element);
    if (label.attr("id") && (label.attr("id").split("-")[0] === "etykieta_pola")) {
      $(label).text(schema.label(label.attr("for")));
    }
  });
};


const formatDate = date => moment(date).format("DD-MM-YYYY, HH:mm");


const escapeJq = id => `#${id.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1")}`;


const setFormValues = (schema, data) => {
  Object.keys(schema.getDefinition()).forEach((fieldLabel) => {
    let valuesChanged = false;
    let value = "";
    let trueFieldLabel = fieldLabel;

    if (trueFieldLabel.indexOf(".") !== -1) {
      trueFieldLabel = trueFieldLabel.split(".")[1];
      value = data[fieldLabel.split(".")[0]][trueFieldLabel];
    } else {
      value = data[trueFieldLabel];
    }

    const uiElement = $(escapeJq(fieldLabel));
    if (uiElement.is("input,textarea")) {
      if (value instanceof Date) {
        uiElement.val(formatDate(value));
        valuesChanged = true;
      } else {
        uiElement.val(value);
        valuesChanged = true;
      }
    }

    if (valuesChanged) {
      Materialize.updateTextFields();
    }
  });
};


export {
  setDirty,
  formatDate,
  escapeJq,
  resetSessionVariables,
  setEditMode,
  getAddingModeFromRoute,
  setFormLabels,
  setFormValues,
  routeBack,
};
