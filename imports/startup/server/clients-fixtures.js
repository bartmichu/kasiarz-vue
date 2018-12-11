/**
 * TODO: usunąć w wersji produkcyjnej
 */

// https://www.json-generator.com/
// {
//   nazwa: "{{company().toUpperCase()}} {{firstName()}} {{surname()}}",
//   nip: "{{integer(1000000000, 9999999999)}}",
//   regonPesel: "",
//     kraj: "Polska",
//     gminaDzielnica: "{{state()}}",
//     ulica: "{{street()}}",
//     nrDomu: "{{integer(1, 500)}}",
//     nrLokalu: "{{integer(1, 50)}}",
//     miejscowosc: "{{city()}}",
//     kodPocztowy: "{{integer(10, 99)}}-{{integer(100, 999)}}",
//     poczta: "{{city()}}",
//     skrytkaPocztowa: "dummy data",
//   telefon: "{{phone()}}",
//   email: "{{email()}}",
//   miejscaInstalacji: [
//     "{{repeat(3)}}",
//     "{{company()}} {{firstName()}} {{surname()}} ul. {{street()}} {{integer(1, 500)}}, {{integer(10, 99)}}-{{integer(100, 999)}} {{city()}}"
//   ]
// }
//

import { Meteor } from "meteor/meteor";
import Clients from "/imports/api/clients/clients.js";
import Voivodeships from "/imports/api/voivodeships/voivodeships.js";

Meteor.startup(() => {
  if (Clients.find().count() === 0) {
    const userId = Meteor.users.findOne({ username: "demo" })._id;
    const voivodeshipsCount = Voivodeships.find().count();
    const dummyData = [
      {
        nazwa: "EXOZENT Susana Monroe",
        nip: 5555319588,
        regonPesel: "",
        kraj: "Polska",
        gminaDzielnica: "Wisconsin",
        ulica: "Dewitt Avenue",
        nrDomu: 431,
        nrLokalu: 24,
        miejscowosc: "Iola",
        kodPocztowy: "24-727",
        poczta: "Lithium",
        skrytkaPocztowa: "dummy data",
        telefon: "(851) 445-3130",
        email: "susanamonroe@exozent.com",
        miejscaInstalacji: ["Isosphere Pansy Webb ul. Wyckoff Avenue 55, 67-690 Guilford", "Gink Sonia Hancock ul. Banker Street 397, 64-664 Dahlen", "Ovium Booth Lara ul. Dearborn Court 79, 19-206 Moscow"]
      },
      {
        nazwa: "OVATION Potts Christian",
        nip: 6849809773,
        regonPesel: "",
        kraj: "Polska",
        gminaDzielnica: "Michigan",
        ulica: "Roosevelt Court",
        nrDomu: 445,
        nrLokalu: 20,
        miejscowosc: "Gallina",
        kodPocztowy: "76-678",
        poczta: "Lavalette",
        skrytkaPocztowa: "dummy data",
        telefon: "(820) 590-3785",
        email: "pottschristian@ovation.com",
        miejscaInstalacji: ["Isbol Ava Lambert ul. Ridge Boulevard 244, 90-295 Winesburg", "Quarex Clark Ramsey ul. Delevan Street 54, 61-125 Thatcher", "Quadeebo Althea Clements ul. Grace Court 162, 85-759 Jardine"]
      },
      {
        nazwa: "ENTOGROK Chambers Cross",
        nip: 6028137391,
        regonPesel: "",
        kraj: "Polska",
        gminaDzielnica: "Washington",
        ulica: "Evergreen Avenue",
        nrDomu: 169,
        nrLokalu: 2,
        miejscowosc: "Boyd",
        kodPocztowy: "53-520",
        poczta: "Maplewood",
        skrytkaPocztowa: "dummy data",
        telefon: "(833) 589-3900",
        email: "chamberscross@entogrok.com",
        miejscaInstalacji: ["Honotron Nikki Stewart ul. Oxford Street 271, 22-332 Mooresburg", "Polarax Brooke Copeland ul. Vanderbilt Street 89, 97-390 Cowiche", "Egypto Britney Castaneda ul. Senator Street 468, 38-110 Machias"]
      },
      {
        nazwa: "ERSUM Josephine Bailey",
        nip: 1381674652,
        regonPesel: "",
        kraj: "Polska",
        gminaDzielnica: "Arkansas",
        ulica: "Applegate Court",
        nrDomu: 143,
        nrLokalu: 29,
        miejscowosc: "Tecolotito",
        kodPocztowy: "79-324",
        poczta: "Clarksburg",
        skrytkaPocztowa: "dummy data",
        telefon: "(827) 526-3817",
        email: "josephinebailey@ersum.com",
        miejscaInstalacji: ["Corepan Graham Lawson ul. Havens Place 20, 19-334 Hiseville", "Dancerity Burns Durham ul. Hart Place 355, 84-253 Waiohinu", "Zinca Marshall Zamora ul. Vanderveer Street 232, 33-648 Toftrees"]
      },
      {
        nazwa: "COMTOURS Roberta Barber",
        nip: 5504663724,
        regonPesel: "",
        kraj: "Polska",
        gminaDzielnica: "Palau",
        ulica: "Clove Road",
        nrDomu: 65,
        nrLokalu: 1,
        miejscowosc: "Allison",
        kodPocztowy: "76-748",
        poczta: "Needmore",
        skrytkaPocztowa: "dummy data",
        telefon: "(808) 472-2520",
        email: "robertabarber@comtours.com",
        miejscaInstalacji: ["Intradisk Bianca Duran ul. Tudor Terrace 390, 25-445 Homeland", "Velos Workman Christensen ul. Whitty Lane 120, 71-845 Coinjock", "Kidgrease Noreen Curry ul. Post Court 328, 99-269 Wyano"]
      },
      {
        nazwa: "CEPRENE Macias Newman",
        nip: 8186018691,
        regonPesel: "",
        kraj: "Polska",
        gminaDzielnica: "Oregon",
        ulica: "Plaza Street",
        nrDomu: 98,
        nrLokalu: 21,
        miejscowosc: "Vallonia",
        kodPocztowy: "80-509",
        poczta: "Avalon",
        skrytkaPocztowa: "dummy data",
        telefon: "(928) 525-2161",
        email: "maciasnewman@ceprene.com",
        miejscaInstalacji: ["Magneato Stafford Bartlett ul. Knapp Street 205, 82-609 Williams", "Terascape Cox Burgess ul. Legion Street 30, 60-840 Calvary", "Snowpoke Marian Barnes ul. Royce Street 340, 40-908 Harmon"]
      },
      {
        nazwa: "CABLAM Oneil Barron",
        nip: 8489813229,
        regonPesel: "",
        kraj: "Polska",
        gminaDzielnica: "North Carolina",
        ulica: "School Lane",
        nrDomu: 115,
        nrLokalu: 1,
        miejscowosc: "Longoria",
        kodPocztowy: "71-779",
        poczta: "Wanamie",
        skrytkaPocztowa: "dummy data",
        telefon: "(824) 447-2228",
        email: "oneilbarron@cablam.com",
        miejscaInstalacji: ["Netplax Katharine Cain ul. Thomas Street 202, 83-848 Townsend", "Cujo Geneva Carr ul. Borinquen Pl 451, 93-195 Orason", "Spherix Figueroa Robinson ul. Sedgwick Street 88, 62-147 Tilleda"]
      },
      {
        nazwa: "OLUCORE Johns Fulton",
        nip: 7385870021,
        regonPesel: "",
        kraj: "Polska",
        gminaDzielnica: "Maine",
        ulica: "Fair Street",
        nrDomu: 200,
        nrLokalu: 1,
        miejscowosc: "Saranap",
        kodPocztowy: "58-228",
        poczta: "Levant",
        skrytkaPocztowa: "dummy data",
        telefon: "(875) 592-3805",
        email: "johnsfulton@olucore.com",
        miejscaInstalacji: ["Gynk Sonya Ball ul. Norman Avenue 279, 42-895 Jennings", "Scentric Phoebe Hayes ul. Ovington Court 104, 38-735 Williamson", "Valreda Spencer Butler ul. Amherst Street 223, 83-912 Soham"]
      },
      {
        nazwa: "TECHTRIX Nola Hebert",
        nip: 6074902652,
        regonPesel: "",
        kraj: "Polska",
        gminaDzielnica: "Connecticut",
        ulica: "Hancock Street",
        nrDomu: 323,
        nrLokalu: 41,
        miejscowosc: "Manchester",
        kodPocztowy: "89-879",
        poczta: "Wikieup",
        skrytkaPocztowa: "dummy data",
        telefon: "(932) 473-3982",
        email: "nolahebert@techtrix.com",
        miejscaInstalacji: ["Reversus Andrea Wood ul. Hope Street 291, 42-505 Abrams", "Billmed Nita Burch ul. Revere Place 176, 39-792 Roeville", "Netility Pitts Glenn ul. Ashland Place 51, 97-537 Rowe"]
      },
      {
        nazwa: "TALKALOT Washington Mccarty",
        nip: 3791167766,
        regonPesel: "",
        kraj: "Polska",
        gminaDzielnica: "Guam",
        ulica: "Leonard Street",
        nrDomu: 476,
        nrLokalu: 46,
        miejscowosc: "Fairacres",
        kodPocztowy: "30-382",
        poczta: "Vienna",
        skrytkaPocztowa: "dummy data",
        telefon: "(889) 556-3058",
        email: "washingtonmccarty@talkalot.com",
        miejscaInstalacji: ["Artiq Hilary Cantu ul. Bulwer Place 481, 39-924 Cucumber", "Dognosis Dotson Meyer ul. Bliss Terrace 113, 15-486 Dola", "Orbean Terrell Carson ul. Sunnyside Court 65, 61-224 Belfair"]
      }
    ];

    dummyData.forEach(client => {
      client.uzytkownikId = userId;

      const randomNumber = Math.floor(Math.random() * voivodeshipsCount);
      client.wojewodztwoId = Voivodeships.find({}, { skip: randomNumber, limit: 1 }).fetch()[0]._id;

      client.dataUtworzenia = new Date();
      client.dataModyfikacji = client.dataUtworzenia;

      client.dodatkoweInformacje = "dummy data";

      Clients.insert(client);
    });
  }
});
