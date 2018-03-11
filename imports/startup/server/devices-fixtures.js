/**
 * TODO: usunąć w wersji produkcyjnej
 */

// https://www.json-generator.com/
// {
//   miejsceInstalacji: "{{company()}} {{firstName()}} {{surname()}} ul. {{street()}} {{integer(1, 500)}}, {{integer(10, 99)}}-{{integer(100, 999)}} {{city()}}"
// }
//

import { Meteor } from "meteor/meteor";
import Devices from "/imports/api/devices/devices.js";
import Models from "/imports/api/models/models.js";
import Clients from "/imports/api/clients/clients.js";


Meteor.startup(() => {
  if (Devices.find().count() === 0) {
    const userId = Meteor.users.findOne({ username: "demo" })._id;
    const modelsCount = Models.find().count();
    const clientsCount = Clients.find().count();
    const dummyData = [
      {
        miejsceInstalacji: "Waab Rich White ul. Ralph Avenue 459, 61-403 Breinigsville",
      },
      {
        miejsceInstalacji: "Cormoran Watson Savage ul. Bethel Loop 65, 84-981 Waikele",
      },
      {
        miejsceInstalacji: "Krag Christina Sellers ul. Bushwick Court 39, 60-943 Norris",
      },
      {
        miejsceInstalacji: "Nixelt Levy Bridges ul. Clifford Place 329, 70-958 Westphalia",
      },
      {
        miejsceInstalacji: "Uncorp Rosario Dudley ul. Christopher Avenue 432, 31-319 Gilmore",
      },
      {
        miejsceInstalacji: "Rodeomad Bishop Lancaster ul. Holt Court 165, 36-813 Cazadero",
      },
      {
        miejsceInstalacji: "Twiist Combs Kline ul. Grattan Street 155, 87-821 Sugartown",
      },
      {
        miejsceInstalacji: "Zillactic Bates Burt ul. Waldane Court 92, 27-465 Brookfield",
      },
      {
        miejsceInstalacji: "Zentia Lacy Little ul. Stone Avenue 325, 77-582 Wright",
      },
      {
        miejsceInstalacji: "Insuron Foster Wynn ul. Poly Place 72, 70-442 Herald",
      },
      {
        miejsceInstalacji: "Proflex Payne Rasmussen ul. Wallabout Street 17, 44-667 Kenvil",
      },
      {
        miejsceInstalacji: "Zork Sawyer Kerr ul. Canarsie Road 159, 47-805 Broadlands",
      },
      {
        miejsceInstalacji: "Tubalum Malinda Marquez ul. Church Avenue 296, 78-520 Collins",
      },
      {
        miejsceInstalacji: "Tubesys Boyle Wright ul. Commerce Street 330, 77-973 Kipp",
      },
      {
        miejsceInstalacji: "Orbin Claire Porter ul. Cozine Avenue 147, 85-385 Ernstville",
      },
    ];

    dummyData.forEach((device) => {
      device.uzytkownikId = userId;

      let randomNumber = Math.floor(Math.random() * modelsCount);
      device.modelId = Models.find({}, { skip: randomNumber, limit: 1 }).fetch()[0]._id;

      randomNumber = Math.floor(Math.random() * clientsCount);
      device.klientId = Clients.find({}, { skip: randomNumber, limit: 1 }).fetch()[0]._id;

      device.dataFiskalizacji = new Date();

      device.dataUtworzenia = new Date();
      device.dataModyfikacji = device.dataUtworzenia;

      device.dodatkoweInformacje = "dummy data";

      Devices.insert(device);
    });
  }
});
