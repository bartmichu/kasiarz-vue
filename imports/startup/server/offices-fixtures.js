/**
 * TODO: usunąć w wersji produkcyjnej
 */

// https://www.json-generator.com/
// {
//   nazwa: "Urząd Skarbowy w {{city()}}",
//   adresat: "Naczelnik urzędu skarbowego",
//   nip: "{{integer(1000000000, 9999999999)}}",
//   regonPesel: "",
//   adres: {
//     kraj: "Polska",
//     gminaDzielnica: "{{state()}}",
//     ulica: "{{street()}}",
//     nrDomu: "{{integer(1, 500)}}",
//     nrLokalu: "{{integer(1, 50)}}",
//     miejscowosc: "{{city()}}",
//     kodPocztowy: "{{integer(10, 99)}}-{{integer(100, 999)}}",
//     poczta: "{{city()}}"
//   },
//   telefon: "{{phone()}}",
//   email: "{{email()}}"
// }
//

import { Meteor } from "meteor/meteor";
import Offices from "/imports/api/offices/offices.js";
import Voivodeships from "/imports/api/voivodeships/voivodeships.js";


Meteor.startup(() => {
  if (Offices.find().count() === 0) {
    const userId = Meteor.users.findOne({ username: "demo" })._id;
    const voivodeshipsCount = Voivodeships.find().count();
    const dummyData = [
      {
        nazwa: "Urząd Skarbowy w Cade",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 9886624271,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Guam",
          ulica: "Pineapple Street",
          nrDomu: 264,
          nrLokalu: 13,
          miejscowosc: "Riviera",
          kodPocztowy: "49-892",
          poczta: "Dana",
        },
        telefon: "(932) 537-2149",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Englevale",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 3510021777,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Iowa",
          ulica: "Rose Street",
          nrDomu: 175,
          nrLokalu: 24,
          miejscowosc: "Hailesboro",
          kodPocztowy: "22-385",
          poczta: "Enoree",
        },
        telefon: "(904) 468-3787",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Kenvil",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 1375619237,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Nebraska",
          ulica: "Whitwell Place",
          nrDomu: 425,
          nrLokalu: 42,
          miejscowosc: "Richmond",
          kodPocztowy: "77-588",
          poczta: "Beyerville",
        },
        telefon: "(809) 406-3834",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Innsbrook",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 7957236993,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Ohio",
          ulica: "Chester Court",
          nrDomu: 43,
          nrLokalu: 45,
          miejscowosc: "Valmy",
          kodPocztowy: "36-859",
          poczta: "Leyner",
        },
        telefon: "(898) 536-3595",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Dunnavant",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 9840648036,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Georgia",
          ulica: "Duryea Place",
          nrDomu: 314,
          nrLokalu: 43,
          miejscowosc: "Ona",
          kodPocztowy: "11-509",
          poczta: "Brazos",
        },
        telefon: "(886) 470-2501",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Johnsonburg",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 2479812543,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Federated States Of Micronesia",
          ulica: "Osborn Street",
          nrDomu: 388,
          nrLokalu: 31,
          miejscowosc: "Mooresburg",
          kodPocztowy: "72-986",
          poczta: "Sunriver",
        },
        telefon: "(847) 588-2457",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Sunwest",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 9580875789,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Maine",
          ulica: "Matthews Place",
          nrDomu: 265,
          nrLokalu: 23,
          miejscowosc: "Chamberino",
          kodPocztowy: "10-295",
          poczta: "Clayville",
        },
        telefon: "(883) 440-2382",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Oasis",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 3342508523,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Massachusetts",
          ulica: "Lott Street",
          nrDomu: 218,
          nrLokalu: 9,
          miejscowosc: "Elbert",
          kodPocztowy: "94-714",
          poczta: "Grayhawk",
        },
        telefon: "(834) 477-3173",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Ilchester",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 2041326897,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Puerto Rico",
          ulica: "Dewey Place",
          nrDomu: 218,
          nrLokalu: 30,
          miejscowosc: "Hardyville",
          kodPocztowy: "31-531",
          poczta: "Whitehaven",
        },
        telefon: "(812) 423-2115",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Baden",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 2130682727,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Oregon",
          ulica: "Prince Street",
          nrDomu: 226,
          nrLokalu: 27,
          miejscowosc: "Jamestown",
          kodPocztowy: "39-807",
          poczta: "Colton",
        },
        telefon: "(854) 513-3733",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Glendale",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 2537795066,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Wisconsin",
          ulica: "Monitor Street",
          nrDomu: 413,
          nrLokalu: 32,
          miejscowosc: "Bagtown",
          kodPocztowy: "60-716",
          poczta: "Wheaton",
        },
        telefon: "(980) 409-3112",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Spokane",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 8250096045,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Louisiana",
          ulica: "Georgia Avenue",
          nrDomu: 144,
          nrLokalu: 24,
          miejscowosc: "Chautauqua",
          kodPocztowy: "58-202",
          poczta: "Cutter",
        },
        telefon: "(820) 507-3724",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Blanford",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 4279246148,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Virginia",
          ulica: "Lott Place",
          nrDomu: 291,
          nrLokalu: 49,
          miejscowosc: "Walland",
          kodPocztowy: "95-546",
          poczta: "Gorst",
        },
        telefon: "(907) 461-2741",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Riceville",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 5833977380,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Oklahoma",
          ulica: "Gilmore Court",
          nrDomu: 140,
          nrLokalu: 46,
          miejscowosc: "Vincent",
          kodPocztowy: "42-388",
          poczta: "Fresno",
        },
        telefon: "(924) 504-2121",
        email: "cottonmartinez@mazuda.com",
      },
      {
        nazwa: "Urząd Skarbowy w Wolcott",
        adresat: "Naczelnik urzędu skarbowego",
        nip: 1868155479,
        regonPesel: "",
        adres: {
          kraj: "Polska",
          gminaDzielnica: "Michigan",
          ulica: "Ide Court",
          nrDomu: 241,
          nrLokalu: 11,
          miejscowosc: "Edmund",
          kodPocztowy: "73-781",
          poczta: "Stockdale",
        },
        telefon: "(935) 535-2525",
        email: "cottonmartinez@mazuda.com",
      },
    ];

    dummyData.forEach((office) => {
      const randomNumber = Math.floor(Math.random() * voivodeshipsCount);
      office.uzytkownikId = userId;
      office.adres.wojewodztwoId = Voivodeships.find({}, { skip: randomNumber, limit: 1 }).fetch()[0]._id;
      office.dataUtworzenia = new Date();
      office.dataModyfikacji = office.dataUtworzenia;
      office.dodatkoweInformacje = "dummy data";
      Offices.insert(office);
    });
  }
});
