import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { getAddingModeFromRoute, setEditMode, setFormLabels } from "/imports/util/client/client-functions.js";
import Models from "/imports/api/models/models.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_close_T.js";
import "/imports/ui/components/item_menu/item_menu_delete_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "./models_item_T.html";


Template.models_item_T.onCreated(() => {
  Template.instance().subscribe("manufacturers.private");
  setEditMode(getAddingModeFromRoute());
});


Template.models_item_T.rendered = () => {
  $("select").material_select();

  setFormLabels(Models.simpleSchema());
  // TODO: uzupełnianie danych formularza
};


Template.models_item_T.helpers({
  manufacturersListH() {
    return Manufacturers.find({}, { sort: { nazwa: 1 } });
  },
  fixDisabledAttributeH() {
    // HACK: odwrotny stan disabled bez defer
    Meteor.defer(() => {
      $("select").material_select();
    });
  },
});


Template.models_item_T.events({
  submit(event) {
    event.preventDefault();
  },
  "input input, input textarea": () => {
    if (Session.equals("isEditMode", true)) {
      Session.set("isDirty", true);
    }
  },
  "blur input, blur textarea": (event) => {
    event.target.value = event.target.value.trim();
  },
});
