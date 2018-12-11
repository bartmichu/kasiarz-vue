import moment from "moment";

function formatDateLong(date) {
  return typeof date === "undefined" ? "brak" : moment(date).format("DD-MM-YYYY, HH:mm");
}

export { formatDateLong };
