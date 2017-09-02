import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import "/imports/ui/components/list_placeholder_T.js";
import "/imports/ui/components/loading_T.js";
import "/imports/ui/components/list_menu_add_T.js";
import "./manufacturers_T.html";


Template.manufacturers_T.onCreated(() => {
  Template.instance().subscribe("manufacturers.private");
});


Template.manufacturers_T.helpers({
  getSubscriptionDataH() {
    return Manufacturers.find();
  },
  numberOfElementsH() {
    return Manufacturers.find().count();
  },
  isEmptyCollectionH() {
    return Manufacturers.find().count() === 0;
  },
  getLabelH(pole) {
    return Manufacturers.simpleSchema().label(pole);
  },
});


Template.manufacturers_T.events({
  submit(event) {
    event.preventDefault();
  },
  "click #element": function () {
    FlowRouter.go("manufacturers.manufacturer", { _id: this._id });
  },
});
