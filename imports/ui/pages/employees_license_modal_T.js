import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { setFormValues, setDirty, jqEscapeAndHash, setEditMode } from "/imports/util/client/client-functions.js";
import Models from "/imports/api/models/models.js";
import Employees from "/imports/api/employees/employees.js";
import "/imports/ui/components/loading_placeholder/loading_placeholder_T.js";
import "/imports/ui/components/form_controls/input_field_T.js";
import "/imports/ui/components/form_controls/textarea_field_T.js";
import "/imports/ui/components/form_controls/multiple_select_field_T.js";
import "/public/semantic/semantic.min.js";
import "./employees_license_modal_T.html";


Template.employees_license_modal_T.onCreated(() => {
  const template = Template.instance();
  const afterFlushCallback = function afterFlushCallback() {
    // form values are set in modal's onShow callback

    $(jqEscapeAndHash("dropdown__uprawnienia.$.modele")).dropdown({
      onChange() {
        setDirty(true);
      },
    });

    $("#modal-addLicense").modal({
      closable: false,
      duration: 100,
      autofocus: true,
      onShow() {
        if (FlowRouter.getQueryParam("newLicense") === "1") {
          setEditMode(true);
          setFormValues();
        }
      },
      onApprove() {
        if (FlowRouter.getQueryParam("newLicense") === "1") {
          // TODO: zautomatyzować
          const formData = {
            numerUprawnien: $(jqEscapeAndHash("uprawnienia.$.numerUprawnien")).val(),
            modele: $(jqEscapeAndHash("dropdown__uprawnienia.$.modele")).dropdown("get value").split(","),
            dodatkoweInformacje: $(jqEscapeAndHash("uprawnienia.$.dodatkoweInformacje")).val(),
          };
          Meteor.call("employees.addLicense", { documentId: FlowRouter.getParam("_id"), formData }, (error) => {
            if (error) {
              console.log(error);
              // TODO: wyświetlić odpowiedni modal
            }
          });
        }
        $(jqEscapeAndHash("uprawnienia.$.numerUprawnien")).val("");
        $(jqEscapeAndHash("dropdown__uprawnienia.$.modele")).dropdown("clear");
        setEditMode(false);
        FlowRouter.setQueryParams({ newLicense: null });
        // TODO: odświeżenie daty modyfikacji
      },
      onDeny() {
        if (FlowRouter.getQueryParam("newLicense") === "1") {
          setDirty(false);
        }
        $(jqEscapeAndHash("uprawnienia.$.numerUprawnien")).val("");
        $(jqEscapeAndHash("dropdown__uprawnienia.$.modele")).dropdown("clear");
        setEditMode(false);
        FlowRouter.setQueryParams({ newLicense: null });
      },
    });
  };

  template.subscribe("models.basic", () => {
    Tracker.afterFlush(() => {
      afterFlushCallback();
    });
  });
});


Template.employees_license_modal_T.rendered = () => { };


Template.employees_license_modal_T.helpers({
  modelsH() {
    return Models.find({}, { sort: { nazwa: 1 } });
  },
});


Template.employees_license_modal_T.events({
  submit(event) {
    event.preventDefault();
  },
});
