/**
 * TODO: usunąć w wersji produkcyjnej
 */

// https://www.json-generator.com/
// {
//   miejsceInstalacji: "{{company()}} {{firstName()}} {{surname()}} ul. {{street()}} {{integer(1, 500)}}, {{integer(10, 99)}}-{{integer(100, 999)}} {{city()}}",
//   numerFabryczny: "{{integer(1000000000, 9999999999)}}",
//   numerUnikatowy: "{{integer(1000000000, 9999999999)}}"
// }


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
        miejsceInstalacji: "Magmina Rhonda Mcfadden ul. Oceanview Avenue 139, 17-978 Gilmore",
        numerFabryczny: 5564242631,
        numerUnikatowy: 6798816639,
      },
      {
        miejsceInstalacji: "Bleendot Randolph Figueroa ul. Joval Court 207, 38-156 Nile",
        numerFabryczny: 2231662299,
        numerUnikatowy: 8077606825,
      },
      {
        miejsceInstalacji: "Rodeomad Kelley Merrill ul. Howard Alley 384, 22-232 Topanga",
        numerFabryczny: 2827857125,
        numerUnikatowy: 7989460948,
      },
      {
        miejsceInstalacji: "Sulfax Nichole Black ul. Wakeman Place 283, 97-533 Tilden",
        numerFabryczny: 1058278491,
        numerUnikatowy: 5998250314,
      },
      {
        miejsceInstalacji: "Apextri Valarie Henson ul. Milford Street 428, 93-259 Blackgum",
        numerFabryczny: 9923547119,
        numerUnikatowy: 3902710708,
      },
      {
        miejsceInstalacji: "Stockpost Judith Baird ul. Huron Street 173, 77-913 Coalmont",
        numerFabryczny: 7610638271,
        numerUnikatowy: 2173759692,
      },
      {
        miejsceInstalacji: "Earthpure Cherry Robbins ul. Colonial Road 22, 84-510 Kerby",
        numerFabryczny: 9882973541,
        numerUnikatowy: 9507969855,
      },
      {
        miejsceInstalacji: "Qimonk Kara Dominguez ul. Kensington Walk 191, 36-119 Savannah",
        numerFabryczny: 5168076934,
        numerUnikatowy: 2416386209,
      },
      {
        miejsceInstalacji: "Exospace Vinson Harris ul. Hill Street 477, 89-449 Comptche",
        numerFabryczny: 9252676946,
        numerUnikatowy: 7337192660,
      },
      {
        miejsceInstalacji: "Isoswitch Hays Cannon ul. Benson Avenue 128, 94-368 Waverly",
        numerFabryczny: 8659764026,
        numerUnikatowy: 3366966694,
      },
      {
        miejsceInstalacji: "Assistia Toni Stokes ul. Veronica Place 451, 28-918 Chumuckla",
        numerFabryczny: 7442982574,
        numerUnikatowy: 3641723191,
      },
      {
        miejsceInstalacji: "Softmicro Osborn Gomez ul. Polhemus Place 108, 86-130 Hardyville",
        numerFabryczny: 8852369889,
        numerUnikatowy: 7178781380,
      },
      {
        miejsceInstalacji: "Uplinx Rowe Peters ul. Kane Street 274, 23-454 Rockhill",
        numerFabryczny: 8912511388,
        numerUnikatowy: 2012023314,
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
