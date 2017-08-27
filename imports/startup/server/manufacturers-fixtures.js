/**
 * TODO: usunąć w bardziej dojrzałej wersji aplikacji
 */

import { Meteor } from "meteor/meteor";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";


Meteor.startup(() => {
  if (Manufacturers.find().count() === 0) {
    const userId = Meteor.users.findOne({ username: "kasiarz" })._id;
    const dummyData = [
      {
        uzytkownikId: userId,
        nazwa: "Envire",
        adres: {
          ulica: "Melrose Street",
          miejscowosc: "Longoria",
          kodPocztowy: 94947,
        },
      },
      {
        uzytkownikId: userId,
        nazwa: "Rodeology",
        adres: {
          ulica: "Kossuth Place",
          miejscowosc: "Brule",
          kodPocztowy: 28515,
        },
      },
      {
        uzytkownikId: userId,
        nazwa: "Hopeli",
        adres: {
          ulica: "Sheffield Avenue",
          miejscowosc: "Dellview",
          kodPocztowy: 40579,
        },
      },
      {
        uzytkownikId: userId,
        nazwa: "Ultrasure",
        adres: {
          ulica: "Fuller Place",
          miejscowosc: "Vienna",
          kodPocztowy: 17384,
        },
      },
      {
        uzytkownikId: userId,
        nazwa: "Zilla",
        adres: {
          ulica: "Montgomery Street",
          miejscowosc: "Chestnut",
          kodPocztowy: 73989,
        },
      },
      {
        uzytkownikId: userId,
        nazwa: "Unia",
        adres: {
          ulica: "Duryea Place",
          miejscowosc: "Detroit",
          kodPocztowy: 86526,
        },
      },
    ];

    dummyData.forEach(manufacturer => Manufacturers.insert(manufacturer));
  }
});
