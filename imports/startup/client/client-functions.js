import { Session } from "meteor/session";


const setDirty = state => Session.set("isDirty", state);


const setSessionVariables = () => {
  setDirty(false);
};


export { setDirty, setSessionVariables };
