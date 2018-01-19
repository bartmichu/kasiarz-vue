import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { ReactiveVar } from "meteor/reactive-var";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { setFormLabels, setFormValues, setDirty, jqEscapeAndHash } from "/imports/util/client/client-functions.js";
import Models from "/imports/api/models/models.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import "/imports/ui/components/loading/loading_T.js";
import "/public/semantic/semantic.min.js";
import "./employees_license_modal_T.html";


Template.employees_license_modal_T.onCreated(() => {
  Template.instance().isAddingMode = new ReactiveVar(FlowRouter.getQueryParam("newLicense") === "1");
});


Template.employees_license_modal_T.rendered = () => {
  const template = Template.instance();
  template.subscribe("manufacturers.private", "", () => {
    template.subscribe("models.private", "", "", () => {
      if (template.isAddingMode) {
        Tracker.afterFlush(() => {
          // setFormLabels();
          // setFormValues();
          $(jqEscapeAndHash("dropdown-uprawnienia.$.modele")).dropdown({
            onChange() {
              setDirty(true);
            },
          });

          $("#modal-addLicense").modal({
            closable: false,
            duration: 100,
            autofocus: true,
            onShow() {
              $(jqEscapeAndHash("dropdown-uprawnienia.$.modele")).dropdown("clear");
            },
            onApprove() {
              Meteor.call("employee.addLicense", FlowRouter.getParam("_id"), (error) => {
                if (error) {
                  console.log("error");
                } else {
                  // routeBack();
                  console.log("success");
                }
              });
              FlowRouter.setQueryParams({ newLicense: null });
            },
            onDeny() {
              if (template.isAddingMode) {
                setDirty(false);
              }
              FlowRouter.setQueryParams({ newLicense: null });
            },
          });
        });
      }
    });
  });
};


Template.employees_license_modal_T.helpers({
  modelsH() {
    return Models.find({}, { sort: { nazwa: 1 } });
  },
  getManufacturerNameH(manufacturerId) {
    return Manufacturers.findOne({ _id: manufacturerId }).nazwa;
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
