import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "./list_menu_sort_T.html";


Template.list_menu_sort_T.rendered = () => {
  Session.setDefault("sortOrder", "natural");
  $("#dropdown-button-sort").dropdown({
    constrainWidth: false,
    hover: false,
    belowOrigin: true,
    alignment: "left",
  });
};


Template.list_menu_sort_T.events({
  "click #item-sort-natural": () => {
    Session.set("sortOrder", "natural");
  },
  "click #item-sort-chronological": () => {
    Session.set("sortOrder", "chronological");
  },
});
