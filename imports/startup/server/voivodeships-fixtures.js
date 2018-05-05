import { Meteor } from "meteor/meteor";
import Voivodeships from "/imports/api/voivodeships/voivodeships.js";

Meteor.startup(() => {
  if (Voivodeships.find().count() === 0) {
    const dummyData = [
      {
        nazwa: "dolnośląskie"
      },
      {
        nazwa: "kujawsko-pomorskie"
      },
      {
        nazwa: "lubelskie"
      },
      {
        nazwa: "lubuskie"
      },
      {
        nazwa: "łódzkie"
      },
      {
        nazwa: "małopolskie"
      },
      {
        nazwa: "mazowieckie"
      },
      {
        nazwa: "opolskie"
      },
      {
        nazwa: "podlaskie"
      },
      {
        nazwa: "pomorskie"
      },
      {
        nazwa: "śląskie"
      },
      {
        nazwa: "świętokrzyskie"
      },
      {
        nazwa: "warmińsko-mazurskie"
      },
      {
        nazwa: "wielkopolskie"
      },
      {
        nazwa: "zachodniopomorskie"
      }
    ];

    dummyData.forEach(voivodeship => {
      Voivodeships.insert(voivodeship);
    });
  }
});
