/**
 * TODO: usunąć w wersji produkcyjnej
 */

import { Meteor } from "meteor/meteor";
import Models from "/imports/api/models/models.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";


Meteor.startup(() => {
  if (Models.find().count() === 0) {
    const userId = Meteor.users.findOne({ username: "demo" })._id;
    const dummyData = [
      {
        nazwa: "HALAP",
      },
      {
        nazwa: "ZBOO",
      },
      {
        nazwa: "EXOZENT",
      },
      {
        nazwa: "FUTURITY",
      },
      {
        nazwa: "OHMNET",
      },
      {
        nazwa: "SNACKTION",
      },
      {
        nazwa: "SKYPLEX",
      },
      {
        nazwa: "ROTODYNE",
      },
      {
        nazwa: "TWIIST",
      },
      {
        nazwa: "FARMAGE",
      },
    ];

    const manufacturersCount = Manufacturers.find().count();
    dummyData.forEach((model) => {
      model.uzytkownikId = userId;

      const randomNumber = Math.floor(Math.random() * manufacturersCount);
      model.producentId = Manufacturers.find({}, { skip: randomNumber, limit: 1 }).fetch()[0]._id;

      model.dataUtworzenia = new Date();
      model.dataModyfikacji = model.dataUtworzenia;

      model.dodatkoweInformacje = "dummy data";

      Models.insert(model);
    });
  }
});
