import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: "demo",
      password: "kasiarz",
      profile: {
        daneOsobowe: {
          imie: "Jan",
          nazwisko: "Kowalski"
        }
      }
    });

    Accounts.createUser({
      username: "test",
      password: "test",
      profile: {}
    });
  }
});
