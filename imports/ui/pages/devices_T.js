import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ReactiveVar } from "meteor/reactive-var";
import Devices from "/imports/api/devices/devices.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";
import Clients from "/imports/api/clients/clients.js";
import { sortHandler } from "/imports/util/client/client-functions.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/loading_placeholder/loading_placeholder_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "/imports/ui/components/section_menu/section_menu_T.js";
import "./devices_T.html";


Template.devices_T.onCreated(() => {
  Template.instance().subscribe("devices.list");
  Template.instance().subscribe("manufacturers.basic");
  Template.instance().subscribe("models.basic");
  Template.instance().subscribe("clients.extended");
  // TODO: ustawianie wartości domyślnej
  Template.instance().sorfField = new ReactiveVar("dataModyfikacji");
  Template.instance().sortOrder = new ReactiveVar("1");
});


Template.devices_T.helpers({
  getSubscriptionDataH() {
    const selector = {};
    selector[Template.instance().sorfField.get()] = Template.instance().sortOrder.get();
    return Devices.find({}, { sort: selector });
  },
  numberOfElementsH() {
    return Devices.find().count();
  },
  isEmptyCollectionH() {
    return Devices.find().count() === 0;
  },
  getModelNameH() {
    return Models.findOne({ _id: this.toString() }).nazwa;
  },
  getClientNameH() {
    return Clients.findOne({ _id: this.toString() }).nazwa;
  },
});


Template.devices_T.events({
  submit(event) {
    event.preventDefault();
  },
  "click tbody tr": (event) => {
    FlowRouter.go("devices.device", { _id: event.currentTarget.id });
  },
  "click thead th": (event, template) => sortHandler(event, template),
});
