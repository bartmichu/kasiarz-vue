import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { setFormValues, setDirty, jqEscapeAndHash, getAddingModeFromRoute, setEditMode } from "/imports/util/client/client-functions.js";
import Voivodeships from "/imports/api/voivodeships/voivodeships.js";
import Shops from "/imports/api/shops/shops.js";
import Employees from "/imports/api/employees/employees.js";
import "/imports/ui/components/loading_placeholder/loading_placeholder_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "/imports/ui/components/related_placeholder/related_placeholder_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "/imports/ui/components/section_menu/section_menu_T.js";
import "/imports/ui/components/form_controls/input_field_T.js";
import "/imports/ui/components/form_controls/textarea_field_T.js";
import "/imports/ui/components/form_controls/select_field_T.js";
import "/public/semantic/semantic.min.js";
import "./shops_item_T.html";


Template.shops_item_T.onCreated(() => {
  const template = Template.instance();
  const isAddingMode = getAddingModeFromRoute();
  const afterFlushCallback = function afterFlushCallback() {
    if (!isAddingMode) {
      setFormValues();
    }
  };

  setEditMode(isAddingMode);

  template.subscribe("voivodeships.public", () => {
    if (!isAddingMode) {
      const shopId = FlowRouter.getParam("_id");
      template.subscribe("shops.one", shopId, () => {
        template.subscribe("employees.shop.basic", shopId, () => {
          Tracker.afterFlush(() => {
            afterFlushCallback();
          });
        });
      });
    } else {
      Tracker.afterFlush(() => {
        afterFlushCallback();
      });
    }
  });
});


Template.shops_item_T.rendered = () => { };


Template.shops_item_T.helpers({
  voivodeshipsH() {
    return Voivodeships.find();
  },
  getDataH() {
    return Shops.findOne({ _id: FlowRouter.getParam("_id") });
  },
  hasEmployeesH() {
    return Employees.find().count() > 0;
  },
  employeesH() {
    return Employees.find();
  },
});


Template.shops_item_T.events({
  submit(event) {
    event.preventDefault();
  },
});
