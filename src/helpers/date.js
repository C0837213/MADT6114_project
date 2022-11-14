import moment from "moment";

export const getDateString = (date) => {
  return moment(date, "x").format("DD MMM YYYY hh:mm a");
};
