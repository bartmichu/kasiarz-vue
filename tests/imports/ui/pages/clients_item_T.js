import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { getAddingModeFromRoute, setEditMode, setFormValues } from "/imports/util/client/client-functions.js";
import Voivodeships from "/imports/api/voivodeships/voivodeships.js";
import Clients from "/imports/api/clients/clients.js";
import Devices from "/imports/api/devices/devices.js";
import "/imports/ui/components/loading_placeholder/loading_placeholder_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_close_T.js";
import "/imports/ui/components/item_menu/item_menu_delete_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "/imports/ui/components/section_menu/section_menu_T.js";
import "/imports/ui/components/form_controls/input_field_T.js";
import "/imports/ui/components/form_controls/textarea_field_T.js";
import "/imports/ui/components/form_controls/select_field_T.js";
import "/public/semantic/semantic.min.js";
import "./clients_item_T.html";


Template.clients_item_T.onCreated(() => {
  const template = Template.instance();
  const isAddingMode = getAddingModeFromRoute();
  const afterFlushCallback = function afterFlushCallback() {
    if (!isAddingMode) {
      setFormValues();
    }
  };

  setEditMode(isAddingMode);

  template.subscribe("voivodeships.public", () => {
    if (isAddingMode) {
      Tracker.afterFlush(() => {
        afterFlushCallback();
      });
    } else {
      template.subscribe("clients.one", FlowRouter.getParam("_id"), () => {
        template.subscribe("devices.client.full", FlowRouter.getParam("_id"), () => {
          Tracker.afterFlush(() => {
            afterFlushCallback();
          });
        });
      });
    }
  });
});


Template.clients_item_T.rendered = () => { };


Template.clients_item_T.helpers({
  getDataH() {
    return Clients.findOne({ _id: FlowRouter.getParam("_id") });
  },
  hasDevicesH() {
    return Devices.find().count() > 0;
  },
  devicesH() {
    return Devices.find();
  },
  voivodeshipsH() {
    return Voivodeships.find();
  },
});


Template.clients_item_T.events({
  submit(event) {
    event.preventDefault();
  },
});
