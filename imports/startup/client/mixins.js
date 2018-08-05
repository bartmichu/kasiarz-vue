import moment from "moment";

const dateHelpers = {
  methods: {
    $_dateHelpers_format(date) {
      return typeof date === "undefined"
        ? "brak"
        : moment(date).format("DD-MM-YYYY, HH:mm");
    }
  }
};

export { dateHelpers };
