import { Mongo } from "meteor/mongo";

const Models = new Mongo.Collection("Models");
Models.allow({
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
Models.deny({
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

export default Models;
