import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import "./login_T.html";


Template.login_T.onCreated(() => {
  Template.instance().failedLogin = new ReactiveVar(false);
});


/**
 * Funkcje pomocnicze templatki.
 */
Template.login_T.helpers({
  loginStatusClassH() {
    let className = "";
    if (Template.instance().failedLogin.get()) {
      $("#login-button").transition("shake", { duration: 100 });
      className = "negative";
    }
    return className;
  },
  loggingInClassH() {
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
  "keydown input, input input, paste input": function resetFailedLogin(event, template) {
    template.failedLogin.set(false);
  },
  "blur #user-field": function trimUserField() {
    $("#user-field").val($("#user-field").val().trim());
  },
  "click #login-button": function login(event, template) {
    let user = $("#user-field").val();
    let password = $("#password-field").val();

    event.target.blur();

    if (user.length && password.length) {
      Meteor.loginWithPassword(user, password, (error) => {
        if (error) {
          template.failedLogin.set(true);
        } else {
          // pomyślne logowanie - wykonanie Accounts.onLogin()
        }
      });
    } else {
      template.failedLogin.set(true);
    }

    user = "";
    password = "";
  },
});
