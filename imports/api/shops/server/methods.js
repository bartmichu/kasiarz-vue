import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import Shops from "/imports/api/shops/shops.js";


const updateShop = new ValidatedMethod({
  name: "shops.update",
  validate({ formData }) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      const validationContext = Shops.simpleSchema().newContext();
      if (validationContext.validate(formData) === true) {
        const shop = Shops.findOne({});
        if (!shop || (shop.uzytkownikId !== actualUserId)) {
          throw new Meteor.Error("Błąd wywołania metody");
        }
      } else {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run({ formData }) {
    // HACK: Na tą chwilę w bazie powinny być dane tylko jednego serwisu
    const documentId = Shops.findOne({})._id;
    return Shops.update({ _id: documentId }, {
      $set: {
        nazwa: formData.nazwa,
        nip: formData.nip,
        regon: formData.regon,
        pesel: formData.pesel,
        "adres.kraj": formData.adres.kraj,
        "adres.wojewodztwo": formData.adres.wojewodztwo,
        "adres.gminaDzielnica": formData.adres.gminaFzielnica,
        "adres.ulica": formData.adres.ulica,
        "adres.nrDomu": formData.adres.nrDomu,
        "adres.nrLokalu": formData.adres.nrLokalu,
        "adres.miejscowosc": formData.adres.miejscowosc,
        "adres.kodPocztowy": formData.adres.kodPocztowy,
        "adres.poczta": formData.adres.poczta,
        "adres.skrytkaPocztowa": formData.adres.skrytkaPocztowa,
        telefon: formData.telefon,
        email: formData.email,
        dodatkoweInformacje: formData.dodatkoweInformacje,
        dataModyfikacji: new Date(),
      },
    });
  },
});


export default updateShop;
