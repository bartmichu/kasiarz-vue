import { Mongo } from "meteor/mongo";


const Manufacturers = new Mongo.Collection("Manufacturers");
Manufacturers.allow({
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
Manufacturers.deny({
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


export default Manufacturers;
