import { Mongo } from "meteor/mongo";


const Voivodeships = new Mongo.Collection("Voivodeships");
Voivodeships.allow({
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
Voivodeships.deny({
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


export default Voivodeships;
