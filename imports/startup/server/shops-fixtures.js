/**
 * TODO: usunąć w wersji produkcyjnej
 */

import { Meteor } from "meteor/meteor";
import Shops from "/imports/api/shops/shops.js";


Meteor.startup(() => {
  if (Shops.find().count() === 0) {
    const userId = Meteor.users.findOne({ username: "kasiarz" })._id;
    const dummyData = [
      {
        uzytkownikId: userId,
        nazwa: "Dataplex Services",
        nip: "1234567890",
        regon: "",
        pesel: "",
        adres: {
          kraj: "Poland",
          wojewodztwo: "Hidijowd",
          gminaDzielnica: "",
          ulica: "Iron Street",
          nrDomu: "191",
          nrLokalu: "b",
          miejscowosc: "Longoria",
          kodPocztowy: 94947,
          poczta: "Longoria",
          skrytkaPocztowa: "",
        },
        telefon: "123-123-123",
        email: "none",
        dataUtworzenia: new Date(),
      },
    ];

    dummyData.forEach((shop) => {
      shop.dataModyfikacji = shop.dataUtworzenia;
      shop.dodatkoweInformacje = "dummy data";
      Shops.insert(shop);
    });
  }
});
