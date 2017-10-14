import { Session } from "meteor/session";
import { FlowRouter } from "meteor/kadira:flow-router";
import { $ } from "meteor/jquery";
import { Meteor } from "meteor/meteor";
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
  Object.keys(schema.getDefinition()).forEach((fieldName) => {
    let valuesChanged = false;
    let fieldValue = "";

    if (fieldName.indexOf(".") !== -1) {
      const object = fieldName.split(".")[0];
      const property = fieldName.split(".")[1];
      fieldValue = data[object][property];
    } else {
      fieldValue = data[fieldName];
    }

    const uiElement = $(escapeJq(fieldName));
    if (uiElement.is("input,textarea")) {
      if (fieldValue instanceof Date) {
        uiElement.val(formatDate(fieldValue));
        valuesChanged = true;
      } else {
        uiElement.val(fieldValue);
        valuesChanged = true;
      }
    }

    if (valuesChanged) {
      Materialize.updateTextFields();
    }
  });
};


const getFormValues = (schema) => {
  const data = {};

  Object.keys(schema.getDefinition()).forEach((fieldName) => {
    const uiElement = $(escapeJq(fieldName));
    if (uiElement.is("input,textarea") && (uiElement.attr("disabled") !== "disabled")) {
      if (fieldName.indexOf(".") !== -1) {
        const object = fieldName.split(".")[0];
        const property = fieldName.split(".")[1];

        if (typeof data[object] === "undefined") {
          data[object] = {};
        }

        data[object][property] = uiElement.val();
      } else {
        data[fieldName] = uiElement.val();
      }
    }

    data.uzytkownikId = Meteor.userId();
  });

  return data;
};


export {
  setDirty,
  formatDate,
  getFormValues,
  escapeJq,
  resetSessionVariables,
  setEditMode,
  getAddingModeFromRoute,
  setFormLabels,
  setFormValues,
  routeBack,
};
