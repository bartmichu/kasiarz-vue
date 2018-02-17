import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { isNonEmptyString } from "/imports/util/server/server-functions.js";
import Employees from "/imports/api/employees/employees.js";


Meteor.publish("employees.all", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Employees.find({ uzytkownikId: actualUserId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("employees.employeeFilter", function publishFunction(employeeId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(employeeId, isNonEmptyString);

    const data = Employees.find({ uzytkownikId: actualUserId, _id: employeeId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("employees.shopFilter", function publishFunction(shopId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(shopId, isNonEmptyString);

    const data = Employees.find({ uzytkownikId: actualUserId, serwisId: shopId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("employees.modelFilter", function publishFunction(modelId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(modelId, isNonEmptyString);

    const data = Employees.find({ uzytkownikId: actualUserId, "uprawnienia.modele": modelId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});
