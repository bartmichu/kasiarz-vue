import { Session } from "meteor/session";


const setDirty = state => Session.set("isDirty", state);


const resetSessionVariables = () => {
  setDirty(false);
};


export { setDirty, resetSessionVariables };
