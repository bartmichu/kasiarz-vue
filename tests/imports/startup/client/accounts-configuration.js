import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";


Accounts.onLogin(() => {
  FlowRouter.go("index");
});


Meteor.users.deny({
  update() { return true; },
});
