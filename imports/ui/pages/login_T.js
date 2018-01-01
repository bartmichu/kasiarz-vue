import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "/public/semantic/semantic.min.js";
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
    let className = "";
    if (Template.instance().failedLogin.get()) {
      $("#button-login").transition("shake", { duration: 100 });
      className = "negative";
    }
    return className;
  },
  progressIndicatorH() {
    return Meteor.loggingIn() ? "loading" : "";
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
  "keydown input, input input, paste input": (event, template) => {
    template.failedLogin.set(false);
  },
  "blur #field-user": () => {
    $("#field-user").val($("#field-user").val().trim());
  },
  "click #button-login": (event, template) => {
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
