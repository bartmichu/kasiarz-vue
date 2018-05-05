import { Mongo } from "meteor/mongo";

const Devices = new Mongo.Collection("Devices");
Devices.allow({
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
Devices.deny({
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

export default Devices;
