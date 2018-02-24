import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { getAddingModeFromRoute, setEditMode, setFormLabels, setFormValues, setDirty } from "/imports/util/client/client-functions.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";
import "/imports/ui/components/loading/loading_T.js";
import "/imports/ui/components/item_footer/item_footer_T.js";
import "/imports/ui/components/section_menu/section_menu_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_close_T.js";
import "/imports/ui/components/item_menu/item_menu_delete_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/related_placeholder/related_placeholder_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "./manufacturers_item_T.html";


Template.manufacturers_item_T.onCreated(() => {
  const template = Template.instance();
  const isAddingMode = getAddingModeFromRoute();
  const afterFlushCallback = function afterFlushCallback() {
    setFormLabels();
    if (!isAddingMode) {
      setFormValues();
    }
  };

  setEditMode(getAddingModeFromRoute());

  if (isAddingMode) {
    Tracker.afterFlush(() => {
      afterFlushCallback();
    });
  } else {
    const manufacturerId = FlowRouter.getParam("_id");
    template.subscribe("manufacturers.manufacturerFilter", manufacturerId, () => {
      template.subscribe("models.manufacturerFilter", manufacturerId, () => {
        Tracker.afterFlush(() => {
          afterFlushCallback();
        });
      });
    });
  }
});


Template.manufacturers_item_T.rendered = () => { };


Template.manufacturers_item_T.helpers({
  getDataH() {
    return Manufacturers.findOne({ _id: FlowRouter.getParam("_id") });
  },
  hasModelsH() {
    return Models.find().count() > 0;
  },
  modelsH() {
    return Models.find();
  },
});


Template.manufacturers_item_T.events({
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
