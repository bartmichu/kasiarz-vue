import { Mongo } from "meteor/mongo";


const Offices = new Mongo.Collection("Offices");
Offices.allow({
  insert() {
    return false;
  },
  update() {
    return false;
  },
  remove() {
    return false;
  },
});
Offices.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});


export default Offices;
