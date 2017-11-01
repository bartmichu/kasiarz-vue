import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import "./list_menu_add_T.html";


Template.list_menu_add_T.events({
  "click #button-add": () => {
    FlowRouter.go(`${FlowRouter.current().route.name}.add`);
  },
});
