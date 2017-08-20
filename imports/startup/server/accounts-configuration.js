import { Accounts } from "meteor/accounts-base";


Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: true,
  loginExpirationInDays: 14,
});
