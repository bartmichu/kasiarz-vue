import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import Employees from "/imports/api/employees/employees.js";
import licenseSchema from "/imports/api/employees/schema.js";
import Shops from "/imports/api/shops/shops.js";

export const insertEmployee = new ValidatedMethod({
  name: "employees.insert",
  validate(employee) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      const shopId = employee.serwisId;
      check(shopId, String);
      const shop = Shops.findOne({ uzytkownikId: actualUserId, _id: shopId });
      if (!shop || shop.uzytkownikId !== actualUserId) {
        throw new Meteor.Error("Błąd wywołania metody");
      }

      employee.uzytkownikId = actualUserId;

      const validationContext = Employees.simpleSchema().newContext();
      if (validationContext.validate(employee) !== true) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(employee) {
    employee.uzytkownikId = Meteor.userId();
    employee.uprawnienia = [];
    employee.dataUtworzenia = new Date();
    employee.dataModyfikacji = employee.dataUtworzenia;
    return Employees.insert(employee);
  }
});

export const removeEmployee = new ValidatedMethod({
  name: "employees.remove",
  validate(documentId) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const employee = Employees.findOne({ uzytkownikId: actualUserId, _id: documentId });
      if (!employee || employee.uzytkownikId !== actualUserId) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(documentId) {
    return Employees.remove({ _id: documentId });
  }
});

export const updateEmployee = new ValidatedMethod({
  name: "employees.update",
  validate({ documentId, formData }) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const validationContext = Employees.simpleSchema().newContext();
      if (validationContext.validate(formData) === true) {
        const employee = Employees.findOne({ uzytkownikId: actualUserId, _id: documentId });
        if (!employee || employee.uzytkownikId !== actualUserId) {
          throw new Meteor.Error("Błąd wywołania metody");
        }
      } else {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run({ documentId, formData }) {
    return Employees.update(
      { _id: documentId },
      {
        $set: {
          imieNazwisko: formData.imieNazwisko,
          serwisId: formData.serwisId,
          dodatkoweInformacje: formData.dodatkoweInformacje,
          dataModyfikacji: new Date()
        }
      }
    );
  }
});

export const addLicense = new ValidatedMethod({
  name: "employees.addLicense",
  validate({ documentId, formData }) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const validationContext = licenseSchema.newContext();
      if (validationContext.validate(formData) === true) {
        const employee = Employees.findOne({ uzytkownikId: actualUserId, _id: documentId });
        if (!employee || employee.uzytkownikId !== actualUserId) {
          throw new Meteor.Error("Błąd wywołania metody");
        }
      } else {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run({ documentId, formData }) {
    return Employees.update(
      { _id: documentId },
      {
        $push: {
          uprawnienia: formData
        },
        $set: {
          dataModyfikacji: new Date()
        }
      }
    );
  }
});
