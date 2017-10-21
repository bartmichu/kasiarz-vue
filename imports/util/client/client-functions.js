import { Session } from "meteor/session";
import { FlowRouter } from "meteor/kadira:flow-router";
import { $ } from "meteor/jquery";
import { Meteor } from "meteor/meteor";
import { Materialize } from "meteor/materialize:materialize";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";
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


const formatDate = date => moment(date).format("DD-MM-YYYY, HH:mm");


/**
 * Poprzedza znaki specjalne dwoma ukośnikami wstecznymi ("\\") oraz umieszcza znak kratki ("#")
 * na początku podanego ciągu.
 * 
 * Na podstawie kodu z dokumentacji jQuery:
 * http://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
 * 
 * @param {String} id identyfikator
 * @returns odpowiednio zmodyfikowany ciąg tekstowy
 */
const jqEscapeAndHash = id => `#${id.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1")}`;


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

    const uiElement = $(jqEscapeAndHash(fieldName));
    if (uiElement.is("input,textarea,select")) {
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
    const uiElement = $(jqEscapeAndHash(fieldName));
    if (uiElement.is("input,textarea,select") && (uiElement.attr("disabled") !== "disabled")) {
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


const getCollectionFromRoute = () => {
  let collection = null;
  switch (FlowRouter.current().route.group.name) {
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
  return collection;
};


const setFormLabels = () => {
  const schema = getCollectionFromRoute().simpleSchema();
  $("label").each((index, element) => {
    const label = $(element);
    if (label.attr("id") && (label.attr("id").split("-")[0] === "etykieta_pola")) {
      $(label).text(schema.label(label.attr("for")));
    }
  });
};


export {
  setDirty,
  formatDate,
  getFormValues,
  getCollectionFromRoute,
  jqEscapeAndHash,
  resetSessionVariables,
  setEditMode,
  getAddingModeFromRoute,
  setFormLabels,
  setFormValues,
  routeBack,
};
