import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Timestamp } from "@firebase/firestore";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { HStack, Text, VStack, Image, Button } from "native-base";
import moment from "moment";
import { getDateString } from "../helpers/date";
import { updateOrder } from "../services/firebase";

const AdminUserOrder = () => {
  const { params } = useRoute();

  const user = params?.user;
  const [item, setItem] = React.useState(params?.item);
  //   console.log(new Date().getTime());

  const handleChange = (index, isDec) => {
    const _item = { ...item };
    const _items = _item.items;

    if (_items[index]) {
      const item = _items[index];
      if (isDec) {
        if (item.qty > 0) {
          item.qty = item.qty - 1;
        }
      } else {
        item.qty = item.qty + 1;
      }
    }
    setItem(_item);
  };

  const handleUpdate = async (item) => {
    const _item = { ...item };
    _item.updatedAt = new Date().getTime();
    const res = await updateOrder(_item);
    if(res) {
        
    }
  };

  return (
    <View style={styles.container}>
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
                        parseInt(curItem.qty) * parseFloat(curItem.price));
                    }, 0)
                    .toFixed(2)}
                </Text>
              </VStack>
              <Button>Submit Update</Button>
              <Button>Mark as completed</Button>
              <Button>Mark as Ready for shipment</Button>
              <Button>Mark as shipped</Button>
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
        data={item?.items}
        keyExtractor={({ id }) => id}
        renderItem={({ item, index }) => (
          <HStack space={8} paddingVertical={8}>
            <Image
              src={item.image}
              alt="image"
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <VStack justifyContent="center">
              <Text>Name: {item.name}</Text>
              <Text>Price: ${item.price}</Text>
              <Text>
                Sub-Total: $
                {(parseInt(item.qty) * parseFloat(item.price)).toFixed(2)}
              </Text>
            </VStack>
            <View style={{ marginLeft: "auto" }} />
            <VStack justifyContent="center" alignItems={"center"}>
              <Text>Quantity</Text>
              <HStack justifyContent={"center"}>
                <TouchableOpacity>
                  <Text
                    style={{ padding: 8 }}
                    onPress={() => handleChange(index, true)}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ padding: 8, minWidth: 25 }}>{item.qty}</Text>
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
