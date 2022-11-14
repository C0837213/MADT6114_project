import moment from "moment";

export const getDateString = (date) => {
  return moment(date, "x").format("DD MMM YYYY hh:mm a");
};

export const filterByTime = (arr, type) => {
  const list = [...arr];
  let result;
  if (type !== "all") {
    if (type === "lastWeek") {
      result = list.filter((item) => {
        const beginDateTime = moment()
          .subtract(1, "weeks")
          .startOf("week")
          .unix();
        const endDateTime = moment().subtract(1, "weeks").endOf("week").unix();
        const itemCreateTime = moment(item.createdAt, "x").valueOf();
        if (itemCreateTime > beginDateTime && itemCreateTime < endDateTime) {
          return item;
        }
      });
    } else if (type === "lastMonth") {
      result = list.filter((item) => {
        const beginDateTime = moment()
          .subtract(1, "months")
          .startOf("months")
          .unix();
        const endDateTime = moment()
          .subtract(1, "months")
          .endOf("months")
          .unix();
        const itemCreateTime = moment(item.createdAt, "x").valueOf();
        if (itemCreateTime > beginDateTime && itemCreateTime < endDateTime) {
          return item;
        }
      });
    }
  } else {
    result = list;
  }
  return result;
};
