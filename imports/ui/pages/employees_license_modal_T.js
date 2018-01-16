import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { setFormLabels, setFormValues, setDirty, jqEscapeAndHash } from "/imports/util/client/client-functions.js";
import Models from "/imports/api/models/models.js";
import "/imports/ui/components/loading/loading_T.js";
import "/public/semantic/semantic.min.js";
import "./employees_license_modal_T.html";


Template.employees_license_modal_T.onCreated(() => { });


Template.employees_license_modal_T.rendered = () => {
  const template = Template.instance();
  const employeeId = FlowRouter.getParam("_id");
  template.subscribe("employees.private", employeeId, "", () => {
    template.subscribe("models.private", "", "", () => {
      Tracker.afterFlush(() => {
        setFormLabels();
        // setFormValues();

        $(jqEscapeAndHash("dropdown-uprawnienia.modele")).dropdown({
          onChange() {
            console.log("change");
          },
        });

        $("#modal-addLicense").modal({
          onApprove() {
            Meteor.call("employee.addLicense", FlowRouter.getParam("_id"), (error) => {
              if (error) {
                console.log("error");
              } else {
                // routeBack();
                console.log("success");
              }
            });
          },
        }).modal("setting", "closable", false).modal("setting", "duration", 100);
      });
    });
  });
};


Template.employees_license_modal_T.helpers({
  modelsH() {
    return Models.find({}, { sort: { nazwa: 1 } });
  },
});


Template.employees_license_modal_T.events({
  submit(event) {
    event.preventDefault();
  },
  "input input, input textarea": () => {
    if (Session.equals("isEditMode", true)) {
      setDirty(true);
    }
  },
  "blur input, blur textarea": (event) => {
    event.target.value = event.target.value.trim();
  },
});
