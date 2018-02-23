import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import "/imports/ui/components/loading/loading_T.js";
import "/imports/ui/components/item_menu/item_menu_close_T.js";
import "/imports/ui/components/item_menu/item_menu_delete_T.js";
import uimap from "/imports/util/client/uimap.js";
import "./section_menu_T.html";


Template.section_menu_T.onCreated(() => { });


Template.section_menu_T.rendered = () => { };


Template.section_menu_T.helpers({
  crumbsH() {
    return uimap[Session.get("uiSection")].crumbs;
  },
  deleteButtonH() {
    return uimap[Session.get("uiSection")].buttons.delete;
  },
  closeButtonH() {
    return uimap[Session.get("uiSection")].buttons.close;
  },
});


Template.section_menu_T.events({});
