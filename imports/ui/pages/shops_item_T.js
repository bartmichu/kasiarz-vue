import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { setFormLabels, setFormValues, setDirty, jqEscapeAndHash } from "/imports/util/client/client-functions.js";
import voivodeships from "/imports/util/dictionaries/voivodeships.js";
import Shops from "/imports/api/shops/shops.js";
import Employees from "/imports/api/employees/employees.js";
import "/imports/ui/components/loading/loading_T.js";
import "/imports/ui/components/item_footer/item_footer_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "/imports/ui/components/list_placeholder/list_placeholder_T.js";
import "/imports/ui/components/list_menu/list_menu_add_T.js";
import "/public/semantic/semantic.min.js";
import "./shops_item_T.html";


Template.shops_item_T.onCreated(() => { });


Template.shops_item_T.rendered = () => {
  const template = Template.instance();
  const shopId = FlowRouter.getParam("_id");
  template.subscribe("shops.private", shopId, () => {
    template.subscribe("employees.private", "", shopId, () => {
      Tracker.afterFlush(() => {
        setFormLabels();
        setFormValues();
        $(jqEscapeAndHash("dropdown-adres.wojewodztwo")).dropdown({
          onChange() {
            if (Session.equals("isEditMode", true)) {
              setDirty(true);
            }
          },
        });
      });
    });
  });
};


Template.shops_item_T.helpers({
  voivodeshipsH() {
    return voivodeships;
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
  "input input, input textarea": () => {
    if (Session.equals("isEditMode", true)) {
      setDirty(true);
    }
  },
  "blur input, blur textarea": (event) => {
    event.target.value = event.target.value.trim();
  },
});
