import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";


Tracker.autorun(() => {
  if (Meteor.userId() === null) {
    FlowRouter.go("login");
  }
});
