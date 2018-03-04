import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { getAddingModeFromRoute, setEditMode, setFormValues, setDirty, jqEscapeAndHash } from "/imports/util/client/client-functions.js";
import Employees from "/imports/api/employees/employees.js";
import Shops from "/imports/api/shops/shops.js";
import Models from "/imports/api/models/models.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import "/imports/ui/components/loading_placeholder/loading_placeholder_T.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_close_T.js";
import "/imports/ui/components/item_menu/item_menu_delete_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "/imports/ui/components/section_menu/section_menu_T.js";
import "/imports/ui/components/form_controls/input_field_T.js";
import "/imports/ui/components/form_controls/textarea_field_T.js";
import "/public/semantic/semantic.min.js";
import "./employees_license_modal_T.js";
import "./employees_item_T.html";


Template.employees_item_T.onCreated(() => {
  const template = Template.instance();
  const isAddingMode = getAddingModeFromRoute();
  const afterFlushCallback = function afterFlushCallback() {
    if (!isAddingMode) {
      setFormValues();
    }
    $(jqEscapeAndHash("dropdown__serwisId")).dropdown({
      onChange() {
        if (Session.equals("isEditMode", true)) {
          setDirty(true);
        }
      },
    });
  };

  setEditMode(isAddingMode);

  template.subscribe("shops.all", () => {
    if (isAddingMode) {
      Tracker.afterFlush(() => {
        afterFlushCallback();
      });
    } else {
      template.subscribe("employees.employeeFilter", FlowRouter.getParam("_id"), () => {
        template.subscribe("models.list", () => {
          template.subscribe("manufacturers.basic", () => {
            Tracker.afterFlush(() => {
              afterFlushCallback();
            });
          });
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
  modelsH() {
    return this.modele.map((modelId) => {
      const model = Models.findOne({ _id: modelId });
      return `${model.nazwa} (${Manufacturers.findOne({ _id: model.producentId }).nazwa})`;
    }).join(", ");
  },
  hasLicensesH() {
    return Employees.findOne()
      && Employees.findOne().uprawnienia
      && Employees.findOne().uprawnienia.length > 0;
  },
  schemaH(field) {
    return Employees.simpleSchema().getDefinition(field);
  },
});


Template.employees_item_T.events({
  submit(event) {
    event.preventDefault();
  },
  "click #button-addLicense": () => {
    FlowRouter.setQueryParams({ newLicense: "1" });
    $("#modal-addLicense").modal("show");
  },
});
