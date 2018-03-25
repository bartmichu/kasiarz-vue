import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ReactiveVar } from "meteor/reactive-var";
import Clients from "/imports/api/clients/clients.js";
import { sortHandler } from "/imports/util/client/client-functions.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/loading_placeholder/loading_placeholder_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "/imports/ui/components/section_menu/section_menu_T.js";
import "./clients_T.html";


Template.clients_T.onCreated(() => {
  Template.instance().subscribe("clients.list");
  // TODO: ustawianie wartości domyślnej
  Template.instance().sorfField = new ReactiveVar("dataModyfikacji");
  Template.instance().sortOrder = new ReactiveVar("1");
});


Template.clients_T.helpers({
  getSubscriptionDataH() {
    const selector = {};
    selector[Template.instance().sorfField.get()] = Template.instance().sortOrder.get();
    return Clients.find({}, { sort: selector });
  },
  numberOfElementsH() {
    return Clients.find().count();
  },
  isEmptyCollectionH() {
    return Clients.find().count() === 0;
  },
});


Template.clients_T.events({
  submit(event) {
    event.preventDefault();
  },
  "click tbody tr": (event) => {
    FlowRouter.go("clients.client", { _id: event.currentTarget.id });
  },
  "click thead th": (event, template) => sortHandler(event, template),
});
