import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";

export default () =>
  new Promise(resolve => {
    Tracker.autorun(c => {
      Meteor.user() !== undefined && c.stop();
      Meteor.user() === null && resolve(false);
      Meteor.user() && resolve(true);
    });
  });
