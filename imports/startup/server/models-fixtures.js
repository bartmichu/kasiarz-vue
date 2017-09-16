/**
 * TODO: usunąć w wersji produkcyjnej
 */

import { Meteor } from "meteor/meteor";
import Models from "/imports/api/models/models.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";


Meteor.startup(() => {
  if (Models.find().count() === 0) {
    const userId = Meteor.users.findOne({ username: "kasiarz" })._id;
    const dummyData = [
      {
        uzytkownikId: userId,
        nazwa: "HALAP",
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "ZBOO",
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "EXOZENT",
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "FUTURITY",
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "OHMNET",
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "SNACKTION",
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "SKYPLEX",
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "ROTODYNE",
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "TWIIST",
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "FARMAGE",
        dataUtworzenia: new Date(),
      },
    ];

    const manufacturersCount = Manufacturers.find().count();
    dummyData.forEach((model) => {
      let randomNumber = Math.floor(Math.random() * manufacturersCount);
      model.producentId = Manufacturers.find({}, { skip: randomNumber, limit: 1 }).fetch()[0]._id;
      model.dataModyfikacji = model.dataUtworzenia;
      model.dodatkoweInformacje = "dummy data";
      Models.insert(model);
    });
  }
});
