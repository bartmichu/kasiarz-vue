import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { jqEscapeAndHash, setDirty } from "/imports/util/client/client-functions.js";
import "/public/semantic/semantic.min.js";
import "./select_field_T.html";


Template.select_field_T.onCreated(() => { });


Template.select_field_T.rendered = () => {
  $(jqEscapeAndHash(`dropdown__${Template.instance().data.dataFieldName}`)).dropdown({
    onChange() {
      if (Session.equals("isEditMode", true)) {
        setDirty(true);
      }
    },
  });

  $(jqEscapeAndHash(`dropdown__${Template.instance().data.dataFieldName}`)).dropdown("set selected", Template.instance().data.value);
};


Template.select_field_T.helpers({
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


Template.select_field_T.events({
  submit(event) {
    event.preventDefault();
  },
});
