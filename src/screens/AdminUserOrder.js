import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Timestamp } from "@firebase/firestore";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { HStack, Text, VStack, Image, Button } from "native-base";
import moment from "moment";
import { getDateString } from "../helpers/date";
import {
  createNewOrder,
  getProductById,
  getUserOrderByOrderId,
  updateOrder,
} from "../services/firebase";
import LoadingModal from "../components/LoadingModal";

const AdminUserOrder = () => {
  const { params } = useRoute();
  const [loading, setLoading] = React.useState(false);
  const user = params?.user;

  const [item, setItem] = React.useState(params?.item);

  const handleChange = async (index, isDec) => {
    const _item = { ...item };
    const _items = _item.items;

    if (_items[index]) {
      const item = _items[index];
      if (isDec) {
        if (item.quantity > 0) {
          item.quantity = item.quantity - 1;
        }
      } else {
        const prodInfo = await getProductById(_items[index].id);
        const maxQty = prodInfo.quantity;
        if (parseInt(maxQty) - (parseInt(item.quantity) + 1) > 0) {
          item.quantity = item.quantity + 1;
        }
      }
    }
    setItem(_item);
  };

  const getOrder = async (id) => {
    const order = await getUserOrderByOrderId(id);
    if (order) {
      setItem(order);
      setLoading(false);
    }
  };

  const handleUpdate = async (item) => {
    setLoading(true);
    const _item = { ...item };
    _item.updatedAt = new Date().getTime();
    const total = item.items.reduce((acc, curItem) => {
      return (acc = acc +=
        parseInt(curItem.quantity) * parseFloat(curItem.price));
    }, 0);
    _item.total = total + "";
    const res = await updateOrder(_item);
    if (res) {
      await getOrder(_item.id);
    } else {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (item, status) => {
    const _item = { ...item };
    if (status === "completed") {
      if (item.status === "pending") {
        _item.status = "completed";
        await handleUpdate(_item);
      }
    } else if (status === "ready for shipment") {
      if (_item.status === "completed") {
        _item.status = "ready for shipment";
        await handleUpdate(_item);
      }
    } else if (status === "shipped") {
      if (_item.status === "ready for shipment") {
        _item.status = "shipped";
        await handleUpdate(_item);
      }
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <LoadingModal /> : null}
      <FlatList
        ListFooterComponent={() => {
          return (
            <VStack
              space={4}
              paddingVertical={4}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <VStack>
                <Text fontSize={"lg"}>
                  Total : ${" "}
                  {item.items
                    .reduce((acc, curItem) => {
                      return (acc = acc +=
                        parseInt(curItem.quantity) * parseFloat(curItem.price));
                    }, 0)
                    .toFixed(2)}
                </Text>
              </VStack>
              {item.status === "pending" && (
                <Button onPress={() => handleUpdate(item)}>
                  Submit Update
                </Button>
              )}
              {item.status === "pending" && (
                <Button
                  onPress={() => handleStatusUpdate(item, "ready for shipment")}
                >
                  Mark as completed
                </Button>
              )}
              {item.status === "completed" && (
                <Button onPress={() => handleStatusUpdate(item, "completed")}>
                  Mark as Ready for shipment
                </Button>
              )}
              {item.status === "ready for shipment" && (
                <Button>Mark as shipped</Button>
              )}
            </VStack>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <VStack space={4} paddingBottom={8}>
              <Text>Id: {item.id}</Text>
              <Text>Order Time: {getDateString(item?.createdAt)}</Text>
              <Text>Last Update Time: {getDateString(item?.updatedAt)}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Address: {user.address}</Text>
              <Text>Contact Number: {user.phoneNum}</Text>
            </VStack>
          );
        }}
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1.5, backgroundColor: "lightgrey" }} />
        )}
        data={item.items}
        keyExtractor={({ id }) => id}
        renderItem={({ item: _item, index }) => (
          <HStack space={8} paddingVertical={8}>
            <Image
              src={_item?.image}
              alt="image"
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <VStack justifyContent="center">
              <Text>Name: {_item?.name}</Text>
              <Text>Price: ${_item?.price}</Text>
              <Text>
                Sub-Total: $
                {(parseInt(_item?.quantity) * parseFloat(_item.price)).toFixed(
                  2
                )}
              </Text>
            </VStack>
            <View style={{ marginLeft: "auto" }} />
            <VStack justifyContent="center" alignItems={"center"}>
              <Text>Quantity</Text>
              <HStack justifyContent={"center"}>
                <TouchableOpacity
                  onPress={() => handleChange(index, true)}
                  disabled={item.status !== "pending"}
                >
                  <Text style={{ padding: 8 }}>-</Text>
                </TouchableOpacity>
                <Text style={{ padding: 8, minWidth: 25 }}>
                  {_item.quantity}
                </Text>
                <TouchableOpacity onPress={() => handleChange(index, false)}>
                  <Text style={{ padding: 8 }}>+</Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </HStack>
        )}
      />
    </View>
  );
};

export default AdminUserOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
