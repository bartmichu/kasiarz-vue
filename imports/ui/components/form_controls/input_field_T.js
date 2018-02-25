import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import { setDirty } from "/imports/util/client/client-functions.js";
import "./input_field_T.html";


Template.input_field_T.onCreated(() => { });


Template.input_field_T.rendered = () => { };


Template.input_field_T.helpers({
  labelH() {
    return Template.instance().data.schema.label;
  },
  requiredH() {
    return Template.instance().data.schema.optional ? "" : "required";
  },
  disabledH() {
    let returnValue = "";
    switch (Template.instance().data.disabled) {
      case "yes":
        returnValue = "disabled";
        break;
      case "no":
        returnValue = "";
        break;
      default:
        returnValue = Session.equals("isEditMode", true) ? "" : "disabled";
        break;
    }
    return returnValue;
  },
});


Template.input_field_T.events({
  submit(event) {
    event.preventDefault();
  },
  "input input": () => {
    if (Session.equals("isEditMode", true)) {
      setDirty(true);
    }
  },
  "blur input, blur textarea": (event) => {
    const eventTarget = event.target;
    eventTarget.value = eventTarget.value.trim();
  },
});
