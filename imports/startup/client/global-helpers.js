import { Template } from "meteor/templating";
import { Session } from "meteor/session";


Template.registerHelper("isDirtyGH", () => Session.get("isDirty"));
