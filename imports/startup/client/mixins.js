import moment from "moment";

const formatDate = {
  methods: {
    formatDate(date) {
      return typeof date === "undefined"
        ? "brak"
        : moment(date).format("DD-MM-YYYY, HH:mm");
    }
  }
};

export { formatDate };
