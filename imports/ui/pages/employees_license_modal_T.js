import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { setFormLabels, setFormValues, setDirty, jqEscapeAndHash } from "/imports/util/client/client-functions.js";
import Models from "/imports/api/models/models.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import "/imports/ui/components/loading/loading_T.js";
import "/public/semantic/semantic.min.js";
import "./employees_license_modal_T.html";


Template.employees_license_modal_T.onCreated(() => {
  const template = Template.instance();
  const afterFlushCallback = function afterFlushCallback() {
    setFormLabels();

    // form values are set in modal's onShow callback

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
        if (FlowRouter.getQueryParam("newLicense") === "1") {
          setFormValues();
        }
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
        $(jqEscapeAndHash("uprawnienia.$.numerUprawnien")).val("");
        $(jqEscapeAndHash("dropdown-uprawnienia.$.modele")).dropdown("clear");
        FlowRouter.setQueryParams({ newLicense: null });
      },
      onDeny() {
        if (FlowRouter.getQueryParam("newLicense") === "1") {
          setDirty(false);
        }
        $(jqEscapeAndHash("uprawnienia.$.numerUprawnien")).val("");
        $(jqEscapeAndHash("dropdown-uprawnienia.$.modele")).dropdown("clear");
        FlowRouter.setQueryParams({ newLicense: null });
      },
    });
  };

  template.subscribe("manufacturers.private", "", () => {
    template.subscribe("models.private", "", "", () => {
      Tracker.afterFlush(() => {
        afterFlushCallback();
      });
    });
  });
});


Template.employees_license_modal_T.rendered = () => { };


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
    const eventTarget = event.target;
    eventTarget.value = eventTarget.value.trim();
  },
});
