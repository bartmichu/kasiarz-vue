import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ReactiveVar } from "meteor/reactive-var";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import { sortHandler } from "/imports/util/client/client-functions.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/loading/loading_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "./manufacturers_T.html";


Template.manufacturers_T.onCreated(() => {
  Template.instance().subscribe("manufacturers.private", "");
  // TODO: ustawianie wartości domyślnej
  Template.instance().sorfField = new ReactiveVar("dataModyfikacji");
  Template.instance().sortOrder = new ReactiveVar("1");
});


Template.manufacturers_T.helpers({
  getSubscriptionDataH() {
    const selector = {};
    selector[Template.instance().sorfField.get()] = Template.instance().sortOrder.get();
    return Manufacturers.find({}, { sort: selector });
  },
  numberOfElementsH() {
    return Manufacturers.find().count();
  },
  isEmptyCollectionH() {
    return Manufacturers.find().count() === 0;
  },
  getLabelH(field) {
    return Manufacturers.simpleSchema().label(field);
  },
});


Template.manufacturers_T.events({
  submit(event) {
    event.preventDefault();
  },
  "click tr": (event) => {
    FlowRouter.go("manufacturers.manufacturer", { _id: event.currentTarget.id });
  },
  "click th": (event, template) => sortHandler(event, template),
});
