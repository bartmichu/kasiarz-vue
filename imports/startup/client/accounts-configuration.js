import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import router from "/imports/startup/client/router.js";

Accounts.onLogin(() => {
  router.push({ name: "index" });
});

Accounts.onLogout(() => {
  router.push({ name: "login" });
});

Meteor.users.deny({
  update() {
    return true;
  }
});
