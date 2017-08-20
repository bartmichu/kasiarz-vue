import { Accounts } from "meteor/accounts-base";
import { FlowRouter } from "meteor/kadira:flow-router";


Accounts.onLogin(() => {
  FlowRouter.go("index");
});
