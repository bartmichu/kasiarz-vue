import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";


Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: true,
  loginExpirationInDays: 14,
});


Meteor.users.deny({
  update() { return true; },
});
