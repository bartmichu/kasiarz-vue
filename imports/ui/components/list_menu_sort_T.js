import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "./list_menu_sort_T.html";


Template.list_menu_sort_T.rendered = () => {
  Session.setDefault("sortOrder", "alfabetycznie");
  $("#dropdown-sortuj").dropdown();
  $("#dropdown-sortuj").dropdown({
    onChange(value) {
      Session.set("sortOrder", value);
    },
  });
  $("#dropdown-sortuj").dropdown("set selected", Session.get("sortOrder"));
};
