import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/kadira:flow-router";
import { getAddingModeFromRoute, setEditMode, setFormLabels } from "/imports/util/client/client-functions.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";
import "/imports/ui/components/loading/loading_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_close_T.js";
import "/imports/ui/components/item_menu/item_menu_delete_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "./manufacturers_item_T.html";


Template.manufacturers_item_T.onCreated(() => {
  setEditMode(getAddingModeFromRoute());
});


Template.manufacturers_item_T.rendered = () => {
  Template.instance().subscribe("manufacturers.private");

  // TODO zawęzić subskrypcję do wybranego producenta
  Template.instance().subscribe("models.private", () => {
    Tracker.afterFlush(() => setFormLabels(Manufacturers.simpleSchema()));
  });


  // TODO: automatyczne wypełnianie formularza
};


Template.manufacturers_item_T.helpers({
  getDataH() {
    return Manufacturers.findOne({ _id: FlowRouter.getParam("_id") });
  },
  hasModelsH() {
    return Models.find({ producentId: this._id }).count() > 0;
  },
  modelsH() {
    return Models.find({ producentId: this._id });
  },
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
