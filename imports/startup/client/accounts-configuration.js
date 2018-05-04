import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import router from "/imports/startup/client/route";

Accounts.onLogin(() => {
  router.push({ name: "index" });
});

Meteor.users.deny({
  update() {
    return true;
  }
});
