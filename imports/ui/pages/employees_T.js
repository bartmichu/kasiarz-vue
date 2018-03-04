import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ReactiveVar } from "meteor/reactive-var";
import Employees from "/imports/api/employees/employees.js";
import Shops from "/imports/api/shops/shops.js";
import { sortHandler } from "/imports/util/client/client-functions.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/loading_placeholder/loading_placeholder_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "/imports/ui/components/section_menu/section_menu_T.js";
import "./employees_T.html";


Template.employees_T.onCreated(() => {
  Template.instance().subscribe("employees.all");
  Template.instance().subscribe("shops.basic");
  // TODO: ustawianie wartości domyślnej
  Template.instance().sorfField = new ReactiveVar("dataModyfikacji");
  Template.instance().sortOrder = new ReactiveVar("1");
});


Template.employees_T.helpers({
  getSubscriptionDataH() {
    const selector = {};
    selector[Template.instance().sorfField.get()] = Template.instance().sortOrder.get();
    return Employees.find({}, { sort: selector });
  },
  numberOfElementsH() {
    return Employees.find().count();
  },
  isEmptyCollectionH() {
    return Employees.find().count() === 0;
  },
  getShopNameH() {
    return Shops.findOne({ _id: this.toString() }).nazwa;
  },
  getLabelH(field) {
    return Employees.simpleSchema().label(field);
  },
});


Template.employees_T.events({
  submit(event) {
    event.preventDefault();
  },
  "click tbody tr": (event) => {
    FlowRouter.go("employees.employee", { _id: event.currentTarget.id });
  },
  "click thead th": (event, template) => sortHandler(event, template),
});
