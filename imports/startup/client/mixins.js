import moment from "moment";

const formatDate = {
  methods: {
    $_formatDate_long(date) {
      return typeof date === "undefined"
        ? "brak"
        : moment(date).format("DD-MM-YYYY, HH:mm");
    }
  }
};

export { formatDate };
