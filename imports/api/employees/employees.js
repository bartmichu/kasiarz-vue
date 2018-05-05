import { Mongo } from "meteor/mongo";

const Employees = new Mongo.Collection("Employees");
Employees.allow({
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
Employees.deny({
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

export default Employees;
