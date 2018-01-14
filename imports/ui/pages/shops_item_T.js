import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { $ } from "meteor/jquery";
import { setFormLabels, setFormValues, setDirty, jqEscapeAndHash } from "/imports/util/client/client-functions.js";
import voivodeships from "/imports/util/dictionaries/voivodeships.js";
import "/imports/ui/components/loading/loading_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "/public/semantic/semantic.min.js";
import "./shops_item_T.html";


Template.shops_item_T.onCreated(() => { });


Template.shops_item_T.rendered = () => {
  $(jqEscapeAndHash("#dropdown-adres.wojewodztwo")).dropdown({
    onChange() {
      if (Session.equals("isEditMode", true)) {
        setDirty(true);
      }
    },
  });

  const template = Template.instance();

  template.subscribe("shops.private", () => {
    Tracker.afterFlush(() => {
      setFormLabels();
      setFormValues();
    });
  });
};


Template.shops_item_T.helpers({
  voivodeshipsH() {
    return voivodeships;
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
