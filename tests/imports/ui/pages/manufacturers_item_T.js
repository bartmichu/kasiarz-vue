import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { getAddingModeFromRoute, setEditMode, setFormValues } from "/imports/util/client/client-functions.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";
import Employees from "/imports/api/employees/employees.js";
import "/imports/ui/components/loading_placeholder/loading_placeholder_T.js";
import "/imports/ui/components/section_menu/section_menu_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_close_T.js";
import "/imports/ui/components/item_menu/item_menu_delete_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "/imports/ui/components/related_placeholder/related_placeholder_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "/imports/ui/components/form_controls/input_field_T.js";
import "/imports/ui/components/form_controls/textarea_field_T.js";
import "./manufacturers_item_T.html";


Template.manufacturers_item_T.onCreated(() => {
  const template = Template.instance();
  const isAddingMode = getAddingModeFromRoute();
  const afterFlushCallback = function afterFlushCallback() {
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
    template.subscribe("manufacturers.one", manufacturerId, () => {
      template.subscribe("models.manufacturer.basic", manufacturerId, () => {
        template.subscribe("employees.extended", () => {
          Tracker.afterFlush(() => {
            afterFlushCallback();
          });
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
  hasLicensesH() {
    const manufacturerModels = Models.find({}, { fields: { _id: 1 } }).map(model => model._id);
    return Employees.find({ "uprawnienia.modele": { $in: manufacturerModels } }).count() > 0;
  },
  employeesH() {
    const manufacturerModels = Models.find({}, { fields: { _id: 1 } }).map(model => model._id);
    return Employees.find({ "uprawnienia.modele": { $in: manufacturerModels } });
  },
});


Template.manufacturers_item_T.events({
  submit(event) {
    event.preventDefault();
  },
});
