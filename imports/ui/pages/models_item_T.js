import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { getAddingModeFromRoute, setEditMode, setFormValues, setDirty, jqEscapeAndHash } from "/imports/util/client/client-functions.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";
import Employees from "/imports/api/employees/employees.js";
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
import "./models_item_T.html";


Template.models_item_T.onCreated(() => {
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
  };

  setEditMode(isAddingMode);

  template.subscribe("manufacturers.basic", () => {
    if (isAddingMode) {
      Tracker.afterFlush(() => {
        afterFlushCallback();
      });
    } else {
      template.subscribe("models.one", FlowRouter.getParam("_id"), () => {
        template.subscribe("employees.model.basic", FlowRouter.getParam("_id"), () => {
          Tracker.afterFlush(() => {
            afterFlushCallback();
          });
        });
      });
    }
  });
});


Template.models_item_T.rendered = () => { };


Template.models_item_T.helpers({
  manufacturersH() {
    return Manufacturers.find({}, { sort: { nazwa: 1 } });
  },
  hasLicensesH() {
    return Employees.find().count() > 0;
  },
  employeesH() {
    return Employees.find();
  },
  schemaH(field) {
    return Models.simpleSchema().getDefinition(field);
  },
});


Template.models_item_T.events({
  submit(event) {
    event.preventDefault();
  },
});
