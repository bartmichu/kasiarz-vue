import { Mongo } from "meteor/mongo";

const Shops = new Mongo.Collection("Shops");
Shops.allow({
  insert() {
    return false;
  },
  update() {
    return false;
  },
  remove() {
    return false;
  }
});
Shops.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  }
});

export default Shops;
