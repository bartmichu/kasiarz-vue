import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { FlowRouter } from "meteor/kadira:flow-router";


Tracker.autorun(() => {
  if (Meteor.userId() === null) {
    FlowRouter.go("logowanie");
  }
});
