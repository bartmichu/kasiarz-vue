import { Mongo } from "meteor/mongo";


const Clients = new Mongo.Collection("Clients");
Clients.allow({
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
Clients.deny({
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


export default Clients;
