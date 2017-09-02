import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";
import { getAddingModeFromRoute, setEditMode, setFormLabels } from "/imports/util/client/client-functions.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
// import Models from "/imports/api/models/models.js";
import "./manufacturers_item_T.html";


Template.manufacturers_item_T.onCreated(() => {
  Template.instance().subscribe("manufacturers.private");

  // TODO zawęzić subskrypcję do wybranego producenta
  Template.instance().subscribe("models.private");

  setEditMode(getAddingModeFromRoute());
});


Template.manufacturers_item_T.rendered = () => {
  setFormLabels(Manufacturers.simpleSchema());
  // TODO: automatyczne wypełnianie formularza
};


Template.manufacturers_item_T.helpers({
  getDataH() {
    return Manufacturers.findOne({ _id: FlowRouter.getParam("_id") });
  },
  // hasModelsH() {
  //   return Models.find({ producentId: this._id }).count() > 0;
  // },
  // getModelsH() {
  //   return Models.find({ producentId: this._id });
  // },
});


Template.manufacturers_item_T.events({
  submit(event) {
    event.preventDefault();
  },
  "input input, input textarea": () => {
    if (Session.equals("isEditMode", true)) {
      Session.set("isDirty", true);
    }
  },
  "blur input, blur textarea": (event) => {
    event.target.value = event.target.value.trim();
  },
});
