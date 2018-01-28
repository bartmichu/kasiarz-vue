import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { getAddingModeFromRoute, setEditMode, setFormLabels, setFormValues, setDirty, jqEscapeAndHash } from "/imports/util/client/client-functions.js";
import Shops from "/imports/api/shops/shops.js";
import Employees from "/imports/api/employees/employees.js";
import "/imports/ui/components/loading/loading_T.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/item_footer/item_footer_T.js";
import "/imports/ui/components/related_placeholder/related_placeholder_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_close_T.js";
import "/imports/ui/components/item_menu/item_menu_delete_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "/public/semantic/semantic.min.js";
import "./employees_license_modal_T.js";
import "./employees_item_T.html";


Template.employees_item_T.onCreated(() => {
  function afterFlush() {
    setFormLabels();
    if (getAddingModeFromRoute) {
      setFormValues();
    }
    $(jqEscapeAndHash("dropdown-serwisId")).dropdown({
      onChange() {
        if (Session.equals("isEditMode", true)) {
          setDirty(true);
        }
      },
    });
  }
  const template = Template.instance();
  setEditMode(getAddingModeFromRoute());
  template.subscribe("shops.private", "", () => {
    if (getAddingModeFromRoute) {
      Tracker.afterFlush(() => {
        afterFlush();
      });
    } else {
      template.subscribe("employees.private", FlowRouter.getParam("_id"), "", () => {
        Tracker.afterFlush(() => {
          afterFlush();
        });
      });
    }
  });
});


Template.employees_item_T.rendered = () => { };


Template.employees_item_T.helpers({
  shopsH() {
    return Shops.find({}, { sort: { imieNazwisko: 1 } });
  },
  licensesH() {
    return Employees.findOne().uprawnienia;
  },
  hasLicensesH() {
    const licensesField = Employees.findOne().uprawnienia;
    return licensesField && licensesField.length > 0;
  },
});


Template.employees_item_T.events({
  submit(event) {
    event.preventDefault();
  },
  "input input, input textarea": () => {
    if (Session.equals("isEditMode", true)) {
      setDirty(true);
    }
  },
  "blur input, blur textarea": (event) => {
    event.target.value = event.target.value.trim();
  },
  "click #button-addLicense": () => {
    FlowRouter.setQueryParams({ newLicense: "1" });
    $("#modal-addLicense").modal("show");
  },
});
