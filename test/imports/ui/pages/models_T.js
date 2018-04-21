import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ReactiveVar } from "meteor/reactive-var";
import Models from "/imports/api/models/models.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import { sortHandler } from "/imports/util/client/client-functions.js";
import "/imports/ui/components/section_menu/section_menu_T.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/loading_placeholder/loading_placeholder_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "./models_T.html";


Template.models_T.onCreated(() => {
  Template.instance().subscribe("models.list");
  Template.instance().subscribe("manufacturers.basic");
  // TODO: ustawianie wartości domyślnej
  Template.instance().sorfField = new ReactiveVar("dataModyfikacji");
  Template.instance().sortOrder = new ReactiveVar("1");
});


Template.models_T.helpers({
  getSubscriptionDataH() {
    const selector = {};
    selector[Template.instance().sorfField.get()] = Template.instance().sortOrder.get();
    return Models.find({}, { sort: selector });
  },
  numberOfElementsH() {
    return Models.find().count();
  },
  isEmptyCollectionH() {
    return Models.find().count() === 0;
  },
  getManufacturerNameH() {
    return Manufacturers.findOne({ _id: this.toString() }).nazwa;
  },
});


Template.models_T.events({
  submit(event) {
    event.preventDefault();
  },
  "click tbody tr": (event) => {
    FlowRouter.go("models.model", { _id: event.currentTarget.id });
  },
  "click thead th": (event, template) => sortHandler(event, template),
});
