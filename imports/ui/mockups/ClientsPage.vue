<template>

  <v-card>
    <v-toolbar card color="grey lighten-2">
      <v-toolbar-title>Lista klientów</v-toolbar-title>
    </v-toolbar>

    <v-card-title/>

    <v-card-text>
      <v-data-table :headers="headers" :items="items" hide-actions>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.nazwa }}</td>
          <td class="text-xs-right">{{ props.item.nip }}</td>
          <td class="text-xs-right">{{ props.item.miejscowosc }}</td>
          <td class="text-xs-right">{{ props.item.kodPocztowy }}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

</template>


<script>
export default {
  name: "ClientsPage",

  data() {
    return {
      headers: [
        {
          text: "Nazwa",
          align: "left",
          value: "nazwa"
        },
        {
          text: "NIP",
          align: "right",
          value: "nip"
        },
        {
          text: "Miejscowość",
          align: "right",
          value: "mijscowosc"
        },
        {
          text: "Kod pocztowy",
          align: "right",
          value: "kodPocztowy"
        }
      ],
      items: [
        {
          value: false,
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
          miejscaInstalacji: [
            "Isosphere Pansy Webb ul. Wyckoff Avenue 55, 67-690 Guilford",
            "Gink Sonia Hancock ul. Banker Street 397, 64-664 Dahlen",
            "Ovium Booth Lara ul. Dearborn Court 79, 19-206 Moscow"
          ]
        },
        {
          value: false,
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
          miejscaInstalacji: [
            "Isbol Ava Lambert ul. Ridge Boulevard 244, 90-295 Winesburg",
            "Quarex Clark Ramsey ul. Delevan Street 54, 61-125 Thatcher",
            "Quadeebo Althea Clements ul. Grace Court 162, 85-759 Jardine"
          ]
        },
        {
          value: false,
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
          miejscaInstalacji: [
            "Honotron Nikki Stewart ul. Oxford Street 271, 22-332 Mooresburg",
            "Polarax Brooke Copeland ul. Vanderbilt Street 89, 97-390 Cowiche",
            "Egypto Britney Castaneda ul. Senator Street 468, 38-110 Machias"
          ]
        },
        {
          value: false,
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
          miejscaInstalacji: [
            "Corepan Graham Lawson ul. Havens Place 20, 19-334 Hiseville",
            "Dancerity Burns Durham ul. Hart Place 355, 84-253 Waiohinu",
            "Zinca Marshall Zamora ul. Vanderveer Street 232, 33-648 Toftrees"
          ]
        },
        {
          value: false,
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
          miejscaInstalacji: [
            "Intradisk Bianca Duran ul. Tudor Terrace 390, 25-445 Homeland",
            "Velos Workman Christensen ul. Whitty Lane 120, 71-845 Coinjock",
            "Kidgrease Noreen Curry ul. Post Court 328, 99-269 Wyano"
          ]
        },
        {
          value: false,
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
          miejscaInstalacji: [
            "Magneato Stafford Bartlett ul. Knapp Street 205, 82-609 Williams",
            "Terascape Cox Burgess ul. Legion Street 30, 60-840 Calvary",
            "Snowpoke Marian Barnes ul. Royce Street 340, 40-908 Harmon"
          ]
        },
        {
          value: false,
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
          miejscaInstalacji: [
            "Netplax Katharine Cain ul. Thomas Street 202, 83-848 Townsend",
            "Cujo Geneva Carr ul. Borinquen Pl 451, 93-195 Orason",
            "Spherix Figueroa Robinson ul. Sedgwick Street 88, 62-147 Tilleda"
          ]
        },
        {
          value: false,
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
          miejscaInstalacji: [
            "Gynk Sonya Ball ul. Norman Avenue 279, 42-895 Jennings",
            "Scentric Phoebe Hayes ul. Ovington Court 104, 38-735 Williamson",
            "Valreda Spencer Butler ul. Amherst Street 223, 83-912 Soham"
          ]
        },
        {
          value: false,
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
          miejscaInstalacji: [
            "Reversus Andrea Wood ul. Hope Street 291, 42-505 Abrams",
            "Billmed Nita Burch ul. Revere Place 176, 39-792 Roeville",
            "Netility Pitts Glenn ul. Ashland Place 51, 97-537 Rowe"
          ]
        },
        {
          value: false,
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
          miejscaInstalacji: [
            "Artiq Hilary Cantu ul. Bulwer Place 481, 39-924 Cucumber",
            "Dognosis Dotson Meyer ul. Bliss Terrace 113, 15-486 Dola",
            "Orbean Terrell Carson ul. Sunnyside Court 65, 61-224 Belfair"
          ]
        },
        {
          value: false,
          nazwa: "ZAGGLES Tricia Norris",
          nip: 6794579411,
          regonPesel: "",
          kraj: "Polska",
          gminaDzielnica: "Marshall Islands",
          ulica: "Union Avenue",
          nrDomu: 5,
          nrLokalu: 18,
          miejscowosc: "Eggertsville",
          kodPocztowy: "41-867",
          poczta: "Kingstowne",
          skrytkaPocztowa: "dummy data",
          telefon: "(977) 580-3333",
          email: "tricianorris@zaggles.com",
          miejscaInstalacji: [
            "Comfirm Kerri Holcomb ul. Huron Street 445, 56-696 Biddle",
            "Zilphur Kerry Navarro ul. Harwood Place 279, 46-201 Fontanelle",
            "Musix Kara Fleming ul. Schenck Street 26, 49-435 Evergreen"
          ]
        },
        {
          value: false,
          nazwa: "UNEEQ Roach Beach",
          nip: 8198481047,
          regonPesel: "",
          kraj: "Polska",
          gminaDzielnica: "South Dakota",
          ulica: "Mayfair Drive",
          nrDomu: 457,
          nrLokalu: 39,
          miejscowosc: "Gracey",
          kodPocztowy: "35-964",
          poczta: "Frierson",
          skrytkaPocztowa: "dummy data",
          telefon: "(868) 467-3763",
          email: "roachbeach@uneeq.com",
          miejscaInstalacji: [
            "Accufarm Powell Wilkins ul. Montieth Street 439, 67-720 Emory",
            "Vitricomp Kate Langley ul. Calyer Street 326, 39-254 Moraida",
            "Straloy Murphy Lane ul. Amboy Street 114, 92-296 Celeryville"
          ]
        },
        {
          value: false,
          nazwa: "AQUOAVO Enid Waters",
          nip: 6403541174,
          regonPesel: "",
          kraj: "Polska",
          gminaDzielnica: "Colorado",
          ulica: "Harbor Lane",
          nrDomu: 128,
          nrLokalu: 9,
          miejscowosc: "Rockhill",
          kodPocztowy: "28-398",
          poczta: "Dundee",
          skrytkaPocztowa: "dummy data",
          telefon: "(868) 578-2602",
          email: "enidwaters@aquoavo.com",
          miejscaInstalacji: [
            "Datagen Lisa Sawyer ul. Bergen Street 220, 10-290 Boykin",
            "Handshake Rosie Morris ul. Miami Court 325, 79-577 Allamuchy",
            "Kongle Soto Kramer ul. Arlington Place 396, 92-236 Herlong"
          ]
        },
        {
          value: false,
          nazwa: "NURPLEX Benson Vincent",
          nip: 5586618198,
          regonPesel: "",
          kraj: "Polska",
          gminaDzielnica: "Massachusetts",
          ulica: "Douglass Street",
          nrDomu: 311,
          nrLokalu: 16,
          miejscowosc: "Olney",
          kodPocztowy: "68-870",
          poczta: "Kula",
          skrytkaPocztowa: "dummy data",
          telefon: "(895) 543-2862",
          email: "bensonvincent@nurplex.com",
          miejscaInstalacji: [
            "Zenthall Freda Mcconnell ul. Brown Street 482, 84-985 Yettem",
            "Plasto Rodriguez Solomon ul. Hawthorne Street 358, 45-986 Wescosville",
            "Comvene Terry Suarez ul. Ditmars Street 97, 63-277 Loma"
          ]
        }
      ]
    };
  }
};
</script>
