import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { $ } from "meteor/jquery";
import { getAddingModeFromRoute, setEditMode, setFormLabels, setFormValues, setDirty } from "/imports/util/client/client-functions.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import "/imports/ui/components/loading/loading_T.js";
import "/imports/ui/components/item_menu/item_menu_cancel_T.js";
import "/imports/ui/components/item_menu/item_menu_close_T.js";
import "/imports/ui/components/item_menu/item_menu_delete_T.js";
import "/imports/ui/components/item_menu/item_menu_edit_T.js";
import "/imports/ui/components/item_menu/item_menu_save_T.js";
import "/public/semantic/semantic.min.js";
import "./models_item_T.html";


Template.models_item_T.onCreated(() => {
  setEditMode(getAddingModeFromRoute());
});


Template.models_item_T.rendered = () => {
  $("#dropdown-model-manufacturer").dropdown({
    onChange() {
      if (Session.equals("isEditMode", true)) {
        setDirty(true);
      }
    },
  });

  const template = Template.instance();

  if (getAddingModeFromRoute()) {
    template.subscribe("manufacturers.private", "", () => {
      Tracker.afterFlush(() => {
        setFormLabels();
        $("#dropdown-model-manufacturer").dropdown();
      });
    });
  } else {
    const modelId = FlowRouter.getParam("_id");
    template.subscribe("models.private", modelId, "", () => {
      template.subscribe("manufacturers.private", "", () => {
        Tracker.afterFlush(() => {
          setFormLabels();
          setFormValues();
          $("#dropdown-model-manufacturer").dropdown();
        });
      });
    });
  }
};


Template.models_item_T.helpers({
  manufacturersH() {
    return Manufacturers.find({}, { sort: { nazwa: 1 } });
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
    event.target.value = event.target.value.trim();
  },
});
