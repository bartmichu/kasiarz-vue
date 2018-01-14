import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Employees from "/imports/api/employees/employees.js";


Meteor.publish("employees.private", (employeeIdFilter, shopIdFilter) => {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(employeeIdFilter, Match.Maybe(String));
    check(shopIdFilter, Match.Maybe(String));

    let data = null;

    if (employeeIdFilter.length > 0) {
      data = Employees.find({ uzytkownikId: actualUserId, _id: employeeIdFilter });
    } else if (shopIdFilter.length > 0) {
      data = Employees.find({ uzytkownikId: actualUserId, shopId: shopIdFilter });
    } else {
      data = Employees.find({ uzytkownikId: actualUserId });
    }

    if (data) {
      return data;
    }
  }

  // TODO: sprawdzić jak to się ma do arrow function
  return this.ready();
});
