import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { getAllOrders } from "../services/firebase";
import { VStack, Text, HStack, Button } from "native-base";
import moment from "moment";
import { filterByTime } from "../helpers/date";

// const dummy = [
//   {
//     catId: "k5rcC9QYgLXnB6pUCbkd",
//     catName: "Meat",
//     createdAt: "1667882967",
//     id: "Ee6GfDO1WEkl0joCTgI3",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/mad6114-2.appspot.com/o/1668406137036png?alt=media&token=dc73e978-1500-418e-9350-fb4f0da07d0d",
//     name: "Meat1",
//     price: "25",
//     quantity: 1,
//   },
//   {
//     catId: "Q0Kn1V3y28G5XjZXCxJB",
//     catName: "Drink",
//     createdAt: "1667882967",
//     id: "YwtGEpiLQ6tG8tLzHtKU",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/mad6114-2.appspot.com/o/1668406540796png?alt=media&token=915c36c2-daf2-484b-aa6f-a5f239002f08",
//     name: "Coke",
//     price: "1",
//     quantity: 2,
//   },
//   {
//     catId: "Q0Kn1V3y28G5XjZXCxJB",
//     catName: "Drink",
//     createdAt: "1667882967",
//     id: "ju2Kc38Xl51EghHWpSIy",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/mad6114-2.appspot.com/o/1668406564465jpg?alt=media&token=7e3119c0-622e-4811-af2a-9438e5446c33",
//     name: "Water",
//     price: "1",
//     quantity: 3,
//   },
//   {
//     catId: "k5rcC9QYgLXnB6pUCbkd",
//     catName: "Meat",
//     createdAt: "1662868167",
//     id: "Ee6GfDO1WEkl0joCTgI3",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/mad6114-2.appspot.com/o/1668406137036png?alt=media&token=dc73e978-1500-418e-9350-fb4f0da07d0d",
//     name: "Meat1",
//     price: "25",
//     quantity: 1,
//   },
//   {
//     catId: "k5rcC9QYgLXnB6pUCbkd",
//     catName: "Meat",
//     createdAt: "1665460167",
//     id: "Ee6GfDO1WEkl0joCTgI3",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/mad6114-2.appspot.com/o/1668406137036png?alt=media&token=dc73e978-1500-418e-9350-fb4f0da07d0d",
//     name: "Meat1",
//     price: "25",
//     quantity: 2,
//   },
// ];

const AdminHome = () => {
  const [orders, setOrders] = React.useState([]);
  const [ordersByCat, setOrderByCat] = React.useState([]);
  const [orderByProd, setOrderByProd] = React.useState([]);
  const [catFilterType, setCatFilterType] = React.useState("");
  const [proFilterType, setProFilterType] = React.useState("");

  React.useEffect(() => {
    fetchAllOrders();
  }, []);

  React.useEffect(() => {
    if (Array.isArray(orders) && orders.length > 0) {
      setCatFilterType("all");
      setProFilterType("all");
    }
  }, [orders]);

  React.useEffect(() => {
    countByCat(catFilterType);
  }, [catFilterType]);

  React.useEffect(() => {
    countByProduct(proFilterType);
  }, [proFilterType]);

  const countByProduct = (type) => {
    const list = [...orders];
    const resultArr = [];
    let result = filterByTime(list, type);
    if (Array.isArray(result) && result.length > 0) {
      result = result.reduce((acc, curItem) => {
        if (!acc[curItem.name]) {
          acc[curItem.name] = 1 * parseInt(curItem.quantity);
        } else {
          acc[curItem.name] = acc[curItem.name] + parseInt(curItem.quantity);
        }
        return acc;
      }, {});
      Object.keys(result).forEach((key) => {
        resultArr.push({ prodName: key, number: result[key] });
      });
      setOrderByProd(resultArr);
    }
  };

  const countByCat = (type) => {
    const list = [...orders];
    const resultArr = [];
    let result = filterByTime(list, type);
    if (Array.isArray(result) && result.length > 0) {
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
      res
        .filter((item) => item.status !== "pending")
        .forEach((item) => {
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
      <FlatList
        ListHeaderComponent={() => (
          <Text fontSize={"lg"}>Sales In Categories</Text>
        )}
        data={ordersByCat}
        ListFooterComponent={() => (
          <>
            <HStack space={4} justifyContent={"center"}>
              <Button onPress={() => setCatFilterType("lastWeek")}>
                Last week
              </Button>
              <Button onPress={() => setCatFilterType("lastMonth")}>
                Last month
              </Button>
              <Button onPress={() => setCatFilterType("all")}>All time</Button>
            </HStack>
            <FlatList
              data={orderByProd}
              ListHeaderComponent={() => (
                <Text fontSize={"lg"}>Sales In Product</Text>
              )}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1.5, backgroundColor: "lightgray" }} />
              )}
              renderItem={({ item }) => (
                <VStack space={4} marginTop={4} marginBottom={4}>
                  <Text>Product name: {item.prodName}</Text>
                  <Text>Number of sales: {item.number}</Text>
                </VStack>
              )}
              style={{ width: "90%", paddingVertical: 16 }}
              ListFooterComponent={() => (
                <HStack space={4} justifyContent={"center"}>
                  <Button onPress={() => setProFilterType("lastWeek")}>
                    Last week
                  </Button>
                  <Button onPress={() => setProFilterType("lastMonth")}>
                    Last month
                  </Button>
                  <Button onPress={() => setProFilterType("all")}>
                    All time
                  </Button>
                </HStack>
              )}
            />
          </>
        )}
        style={{ width: "90%", paddingVertical: 16 }}
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
