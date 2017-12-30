import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "./login_T.html";


/**
 * Funkcja wywoływana po utworzeniu instancji templatki.
 */
Template.login_T.onCreated(() => {
  Template.instance().failedLogin = new ReactiveVar(false);
});


/**
 * Funkcje pomocnicze templatki.
 */
Template.login_T.helpers({
  failedLoginIndicatorH() {
    return Template.instance().failedLogin.get() ? "red" : "grey darken-3";
  },
  progressIndicatorH() {
    return Meteor.loggingIn() ? "disabled" : "";
  },
  loginButtonTextH() {
    return Template.instance().failedLogin.get() ? "nieprawidłowe dane" : "kontynuuj";
  },
});


/**
 * Obsługa zdarzeń templatki.
 */
Template.login_T.events({
  submit(event) {
    event.preventDefault();
  },
  "keydown input, input input, paste input": function resetFailedLogin(event, template) {
    template.failedLogin.set(false);
  },
  "blur #field-user": function trimUserField() {
    $("#field-user").val($("#field-user").val().trim());
  },
  "click #button-login": function login(event, template) {
    let user = $("#field-user").val();
    let password = $("#field-password").val();

    event.target.blur();

    if (user.length && password.length) {
      Meteor.loginWithPassword(user, password, (error) => {
        if (error) {
          template.failedLogin.set(true);
        } else {
          // pomyślne logowanie - wywołanie funkcji Accounts.onLogin()
        }
      });
    } else {
      template.failedLogin.set(true);
    }

    user = "";
    password = "";
  },
});
