import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";
import { ReactiveVar } from "meteor/reactive-var";
import Models from "/imports/api/models/models.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/loading/loading_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "./models_T.html";


Template.models_T.onCreated(() => {
  Template.instance().subscribe("models.private");
  Template.instance().subscribe("manufacturers.private");
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
  getManufacturerNameH: function () {
    return Models.findOne({ _id: this.toString() }).nazwa;
  },
  getLabelH(field) {
    return Models.simpleSchema().label(field);
  },
});


Template.models_T.events({
  submit(event) {
    event.preventDefault();
  },
  "click #element": function () {
    FlowRouter.go("models.model", { _id: this._id });
  },
  "click th": (event, template) => {
    const newSortField = event.target.id.split("-").reverse()[0];
    if (newSortField === template.sorfField.get()) {
      template.sortOrder.set(template.sortOrder.get() * (-1));
    } else {
      template.sorfField.set(newSortField);
    }
  },
});
