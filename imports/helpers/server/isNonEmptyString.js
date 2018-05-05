import { Match, check } from "meteor/check";

const isNonEmptyString = Match.Where(x => {
  check(x, String);
  return x.length > 0;
});

export default isNonEmptyString;
