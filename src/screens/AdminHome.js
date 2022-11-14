import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { getAllOrders } from "../services/firebase";
import { VStack, Text, HStack, Button } from "native-base";
import moment from "moment";

const dummy = [
  {
    catId: "k5rcC9QYgLXnB6pUCbkd",
    catName: "Meat",
    createdAt: "1667882967",
    id: "Ee6GfDO1WEkl0joCTgI3",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mad6114-2.appspot.com/o/1668406137036png?alt=media&token=dc73e978-1500-418e-9350-fb4f0da07d0d",
    name: "Meat1",
    price: "25",
    quantity: 1,
  },
  {
    catId: "Q0Kn1V3y28G5XjZXCxJB",
    catName: "Drink",
    createdAt: "1667882967",
    id: "YwtGEpiLQ6tG8tLzHtKU",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mad6114-2.appspot.com/o/1668406540796png?alt=media&token=915c36c2-daf2-484b-aa6f-a5f239002f08",
    name: "Coke",
    price: "1",
    quantity: 2,
  },
  {
    catId: "Q0Kn1V3y28G5XjZXCxJB",
    catName: "Drink",
    createdAt: "1667882967",
    id: "ju2Kc38Xl51EghHWpSIy",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mad6114-2.appspot.com/o/1668406564465jpg?alt=media&token=7e3119c0-622e-4811-af2a-9438e5446c33",
    name: "Water",
    price: "1",
    quantity: 3,
  },
  {
    catId: "k5rcC9QYgLXnB6pUCbkd",
    catName: "Meat",
    createdAt: "1662868167",
    id: "Ee6GfDO1WEkl0joCTgI3",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mad6114-2.appspot.com/o/1668406137036png?alt=media&token=dc73e978-1500-418e-9350-fb4f0da07d0d",
    name: "Meat1",
    price: "25",
    quantity: 1,
  },
  {
    catId: "k5rcC9QYgLXnB6pUCbkd",
    catName: "Meat",
    createdAt: "1665460167",
    id: "Ee6GfDO1WEkl0joCTgI3",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mad6114-2.appspot.com/o/1668406137036png?alt=media&token=dc73e978-1500-418e-9350-fb4f0da07d0d",
    name: "Meat1",
    price: "25",
    quantity: 2,
  },
];

const AdminHome = () => {
  const [orders, setOrders] = React.useState([]);
  const [ordersByCat, setOrderByCat] = React.useState([]);
  const [orderByProd, setOrderByProd] = React.useState([]);
  const [catFilterType, setCatFilterType] = React.useState("all");

  React.useEffect(() => {
    // fetchAllOrders();
    countByCat("all");
  }, []);

  React.useEffect(() => {
    countByCat(catFilterType);
  }, [catFilterType]);

  const countByCat = (type) => {
    const list = [...dummy];
    const resultArr = [];
    let result;
    if (type !== "all") {
      if (type === "lastWeek") {
        result = list.filter((item) => {
          const beginDateTime = moment()
            .subtract(1, "weeks")
            .startOf("week")
            .unix();
          const endDateTime = moment()
            .subtract(1, "weeks")
            .endOf("week")
            .unix();
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
    if (result.length > 0) {
      result = result.reduce((acc, curItem) => {
        if (!acc[curItem.catName]) {
          acc[curItem.catName] = 1;
        } else {
          acc[curItem.catName] = acc[curItem.catName] + 1;
        }
        return acc;
      }, {});
      Object.keys(result).forEach((key) => {
        resultArr.push({ catName: key, number: result[key] });
      });
      setOrderByCat(resultArr);
    }
  };

  const fetchAllOrders = async () => {
    if (orders.length === 0) {
      const res = await getAllOrders();
      const orderItems = [];
      res.forEach((item) => {
        if (item.items.length > 0) {
          item.items.forEach((_item) => {
            const product = { ..._item, createdAt: item.createdAt };
            orderItems.push(product);
          });
        }
      });
      setOrders(orderItems);
    }
  };

  return (
    <View style={styles.container}>
      <Text fontSize={"lg"}>Sales In Categories</Text>
      <FlatList
        style={{ width: "90%", paddingVertical: 16 }}
        ListHeaderComponent={() => {
          return (
            <FlatList
              data={ordersByCat}
              ListFooterComponent={() => (
                <HStack space={4} justifyContent={"center"}>
                  <Button onPress={() => setCatFilterType("lastWeek")}>
                    Last week
                  </Button>
                  <Button onPress={() => setCatFilterType("lastMonth")}>
                    Last month
                  </Button>
                  <Button onPress={() => setCatFilterType("all")}>
                    All time
                  </Button>
                </HStack>
              )}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1.5, backgroundColor: "lightgray" }} />
              )}
              renderItem={({ item }) => (
                <VStack space={4} marginTop={4} marginBottom={4}>
                  <Text>Categories name: {item.catName}</Text>
                  <Text>Number of sales: {item.number}</Text>
                </VStack>
              )}
            />
          );
        }}
      />
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
});
