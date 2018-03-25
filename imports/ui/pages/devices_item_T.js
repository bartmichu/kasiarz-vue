import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ReactiveVar } from "meteor/reactive-var";
import { $ } from "meteor/jquery";
import { getAddingModeFromRoute, setEditMode, setDirty, jqEscapeAndHash } from "/imports/util/client/client-functions.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";
import Employees from "/imports/api/employees/employees.js";
import Clients from "/imports/api/clients/clients.js";
import Devices from "/imports/api/devices/devices.js";
import "/imports/ui/components/section_menu/section_menu_T.js";
import "/imports/ui/components/loading_placeholder/loading_placeholder_T.js";
import "/imports/ui/components/related_placeholder/related_placeholder_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_close_T.js";
import "/imports/ui/components/item_menu/item_menu_delete_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "/public/semantic/semantic.min.js";
import "./devices_item_T.html";


Template.devices_item_T.onCreated(() => {
  const template = Template.instance();
  const isAddingMode = getAddingModeFromRoute();
  Template.instance().selectedManufacturerId = new ReactiveVar("");
  Template.instance().item_data = new ReactiveVar(null);

  const afterFlushCallback = function afterFlushCallback() {
    $(jqEscapeAndHash("dropdown__producentId")).dropdown({
      onChange() {
        template.selectedManufacturerId.set($(jqEscapeAndHash("dropdown__producentId")).dropdown("get value"));
        $(jqEscapeAndHash("dropdown__modelId")).dropdown("clear");
        if (Session.equals("isEditMode", true)) {
          setDirty(true);
        }
      },
    });
    $(jqEscapeAndHash("dropdown__modelId")).dropdown({
      onChange() {
        if (Session.equals("isEditMode", true)) {
          setDirty(true);
        }
      },
    });
    $(jqEscapeAndHash("dropdown__klientId")).dropdown({
      onChange() {
        if (Session.equals("isEditMode", true)) {
          setDirty(true);
        }
      },
    });

    if (!isAddingMode) {
      template.item_data.set(Devices.findOne({ _id: FlowRouter.getParam("_id") }));
      template.selectedManufacturerId.set(Devices.findOne({ _id: FlowRouter.getParam("_id") }).producentId);
      // TODO: set values
      $(jqEscapeAndHash("dropdown__klientId")).dropdown("set selected", template.item_data.get().klientId);
    }
  };

  setEditMode(isAddingMode);

  template.subscribe("models.extended", () => {
    template.subscribe("manufacturers.basic", () => {
      template.subscribe("clients.extended", () => {
        template.subscribe("employees.extended", () => {
          if (isAddingMode) {
            Tracker.afterFlush(() => {
              afterFlushCallback();
            });
          } else {
            template.subscribe("devices.one", FlowRouter.getParam("_id"), () => {
              Tracker.afterFlush(() => {
                afterFlushCallback();
              });
            });
          }
        });
      });
    });
  });
});


Template.devices_item_T.rendered = () => {

};


Template.devices_item_T.helpers({
  itemDataH() {
    return Template.instance().item_data.get();
  },
  modelsH() {
    return Models.find({ producentId: Template.instance().selectedManufacturerId.get() }, { sort: { nazwa: 1 } });
  },
  manufacturersH() {
    return Manufacturers.find({}, { sort: { nazwa: 1 } });
  },
  clientsH() {
    return Clients.find({}, { sort: { nazwa: 1 } });
  },
  employeesH() {
    return Employees.find();
  },
  labelTextH(schema, field) {
    return schema.getDefinition(field).label;
  },
  nipH() {
    if (Template.instance().item_data.get()) {
      return Clients.findOne({ _id: Template.instance().item_data.get().klientId }).nip;
    }
    return undefined;
  },
});


Template.devices_item_T.events({
  submit(event) {
    event.preventDefault();
  },
  "input input, input textarea": () => {
    if (Session.equals("isEditMode", true)) {
      setDirty(true);
    }
  },
  "blur input, blur textarea": (event) => {
    const eventTarget = event.target;
    eventTarget.value = eventTarget.value.trim();
  },
});
