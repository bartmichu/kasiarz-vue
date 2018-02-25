import SimpleSchema from "simpl-schema";
import Voivodeships from "/imports/api/voivodeships/voivodeships.js";


const voivodeshipSchema = new SimpleSchema({
  nazwa: {
    type: String,
    label: "Nazwa województwa",
    min: 1,
    max: 100,
    optional: false,
  },
});


Voivodeships.attachSchema(voivodeshipSchema);
