import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { getAddingModeFromRoute, setEditMode, setFormLabels, setFormValues, setDirty, jqEscapeAndHash } from "/imports/util/client/client-functions.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Employees from "/imports/api/employees/employees.js";
import "/imports/ui/components/loading/loading_T.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/item_footer/item_footer_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_close_T.js";
import "/imports/ui/components/item_menu/item_menu_delete_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "/public/semantic/semantic.min.js";
import "./models_item_T.html";


Template.models_item_T.onCreated(() => {
  const template = Template.instance();
  const isAddingMode = getAddingModeFromRoute();
  const afterFlushCallback = function afterFlushCallback() {
    setFormLabels();
    if (!isAddingMode) {
      setFormValues();
    }
    $(jqEscapeAndHash("dropdown-producentId")).dropdown({
      onChange() {
        if (Session.equals("isEditMode", true)) {
          setDirty(true);
        }
      },
    });
  };

  setEditMode(isAddingMode);

  template.subscribe("manufacturers.private", "", () => {
    if (isAddingMode) {
      Tracker.afterFlush(() => {
        afterFlushCallback();
      });
    } else {
      template.subscribe("models.private", FlowRouter.getParam("_id"), "", () => {
        template.subscribe("employees.modelFilter", FlowRouter.getParam("_id"), () => {
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
});


Template.models_item_T.events({
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
