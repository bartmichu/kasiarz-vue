import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import "./list_menu_add_T.html";


Template.list_menu_add_T.events({
  "click #button-add": () => {
    const routeName = FlowRouter.current().route.name;
    switch (routeName) {
      case "manufacturers.manufacturer": {
        FlowRouter.go("models.add");
        break;
      }
      default: {
        FlowRouter.go(`${FlowRouter.current().route.name}.add`);
        break;
      }
    }
  },
});
