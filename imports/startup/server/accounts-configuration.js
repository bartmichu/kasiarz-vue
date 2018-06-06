import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: true,
  loginExpirationInDays: 14
});

Meteor.users.deny({
  update() {
    return true;
  }
});
