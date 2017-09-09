import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/loading/loading_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "/imports/ui/components/list_menu/list_menu_sort_T.js";
import "./manufacturers_T.html";


Template.manufacturers_T.onCreated(() => {
  Template.instance().subscribe("manufacturers.private");
});


Template.manufacturers_T.helpers({
  getSubscriptionDataH() {
    const selector = {};
    switch (Session.get("sortOrder")) {
      case "natural":
        selector.nazwaSortowalna = "1";
        break;
      case "chronological":
        selector.dataModyfikacji = "-1";
        break;
      default:
        selector.nazwaSortowalna = "1";
        break;
    }
    return Manufacturers.find({}, { sort: selector });
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
