import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ReactiveVar } from "meteor/reactive-var";
import Shops from "/imports/api/shops/shops.js";
import { sortHandler } from "/imports/util/client/client-functions.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/loading_placeholder/loading_placeholder_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "/imports/ui/components/section_menu/section_menu_T.js";
import "/public/semantic/semantic.min.js";
import "./shops_T.html";


Template.shops_T.onCreated(() => {
  Template.instance().subscribe("shops.list");
  // TODO: ustawianie wartości domyślnej
  Template.instance().sorfField = new ReactiveVar("dataModyfikacji");
  Template.instance().sortOrder = new ReactiveVar("1");
});


Template.shops_T.helpers({
  getSubscriptionDataH() {
    const selector = {};
    selector[Template.instance().sorfField.get()] = Template.instance().sortOrder.get();
    return Shops.find({}, { sort: selector });
  },
  numberOfElementsH() {
    return Shops.find().count();
  },
  isEmptyCollectionH() {
    return Shops.find().count() === 0;
  },
  getLabelH(field) {
    return Shops.simpleSchema().label(field);
  },
});


Template.shops_T.events({
  submit(event) {
    event.preventDefault();
  },
  "click tbody tr": (event) => {
    FlowRouter.go("shops.shop", { _id: event.currentTarget.id });
  },
  "click thead th": (event, template) => sortHandler(event, template),
});
