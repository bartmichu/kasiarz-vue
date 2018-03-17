import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { getAddingModeFromRoute, setEditMode, setFormValues, setDirty, jqEscapeAndHash } from "/imports/util/client/client-functions.js";
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
import "/imports/ui/components/form_controls/input_field_T.js";
import "/imports/ui/components/form_controls/textarea_field_T.js";
import "/imports/ui/components/form_controls/select_field_T.js";
import "/public/semantic/semantic.min.js";
import "./devices_item_T.html";


Template.devices_item_T.onCreated(() => {
  const template = Template.instance();
  const isAddingMode = getAddingModeFromRoute();
  const afterFlushCallback = function afterFlushCallback() {
    if (!isAddingMode) {
      setFormValues();
    }
    $(jqEscapeAndHash("dropdown__producentId")).dropdown({
      onChange() {
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


Template.devices_item_T.rendered = () => { };


Template.devices_item_T.helpers({
  modelsH() {
    return Models.find({}, { sort: { nazwa: 1 } });
  },
  manufacturersH() {
    return Manufacturers.find({}, { sort: { nazwa: 1 } });
  },
  clientsH() {
    return Clients.find({}, { sort: { nazwa: 1 } });
  },
  hasLicensesH() {
    return Employees.find().count() > 0;
  },
  employeesH() {
    return Employees.find();
  },
  schemaH(field) {
    return Devices.simpleSchema().getDefinition(field);
  },
});


Template.devices_item_T.events({
  submit(event) {
    event.preventDefault();
  },
});
