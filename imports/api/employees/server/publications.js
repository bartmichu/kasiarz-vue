import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Employees from "/imports/api/employees/employees.js";


Meteor.publish("employees.private", function publishFunction(employeeIdFilter, shopIdFilter) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(employeeIdFilter, Match.Maybe(String));
    check(shopIdFilter, Match.Maybe(String));

    let data = null;

    if (employeeIdFilter.length > 0) {
      data = Employees.find({ uzytkownikId: actualUserId, _id: employeeIdFilter });
    } else if (shopIdFilter.length > 0) {
      data = Employees.find({ uzytkownikId: actualUserId, serwisId: shopIdFilter });
    } else {
      data = Employees.find({ uzytkownikId: actualUserId });
    }

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("employees.model", function publishFunction(modelId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    // TODO: non empty string
    check(modelId, String);

    const data = Employees.find({ uzytkownikId: actualUserId, "uprawnienia.modele": modelId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});
