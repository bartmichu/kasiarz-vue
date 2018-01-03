/**
 * TODO: usunąć w wersji produkcyjnej
 */

import { Meteor } from "meteor/meteor";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";


Meteor.startup(() => {
  if (Manufacturers.find().count() === 0) {
    const userId = Meteor.users.findOne({ username: "demo" })._id;
    const dummyData = [
      {
        uzytkownikId: userId,
        nazwa: "Envire",
        adres: {
          ulica: "Melrose Street",
          miejscowosc: "Longoria",
          kodPocztowy: 94947,
        },
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "Rodeology",
        adres: {
          ulica: "Kossuth Place",
          miejscowosc: "Brule",
          kodPocztowy: 28515,
        },
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "Hopeli",
        adres: {
          ulica: "Sheffield Avenue",
          miejscowosc: "Dellview",
          kodPocztowy: 40579,
        },
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "Ultrasure",
        adres: {
          ulica: "Fuller Place",
          miejscowosc: "Vienna",
          kodPocztowy: 17384,
        },
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "Zilla",
        adres: {
          ulica: "Montgomery Street",
          miejscowosc: "Chestnut",
          kodPocztowy: 73989,
        },
        dataUtworzenia: new Date(),
      },
      {
        uzytkownikId: userId,
        nazwa: "Unia",
        adres: {
          ulica: "Duryea Place",
          miejscowosc: "Detroit",
          kodPocztowy: 86526,
        },
        dataUtworzenia: new Date(),
      },
    ];

    dummyData.forEach((manufacturer) => {
      manufacturer.dataModyfikacji = manufacturer.dataUtworzenia;
      manufacturer.dodatkoweInformacje = "dummy data";
      Manufacturers.insert(manufacturer);
    });
  }
});
