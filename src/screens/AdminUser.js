import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserData, getUserOrders } from "../services/firebase";
import { HStack, VStack, Text, Button, useNativeBase } from "native-base";

const AdminUser = () => {
  const route = useRoute();
  const { id } = route.params;
  const [orderList, setOrderList] = React.useState([]);
  const [user, setUser] = React.useState(null);

  const navigation = useNavigation();
  React.useEffect(() => {
    fetchOrders();
    fetchUserData();
  }, []);

  const fetchOrders = async () => {
    const res = await getUserOrders(id);
    setOrderList(res);
  };

  const fetchUserData = async () => {
    const res = await getUserData(id);
    if (res) {
      setUser(res);
    }
  };

  const itemPress = (item) => {
    navigation.navigate("UserOrder", { item, user });
  };

  return (
    <View style={styles.container}>
      <Text fontSize="lg">User Profile</Text>
      <VStack space={4} style={{ paddingVertical: 16 }}>
        <HStack>
          <Text>username: </Text>
          <Text>{user?.username}</Text>
        </HStack>
        <HStack>
          <Text>id: </Text>
          <Text>{user?.id}</Text>
        </HStack>
        <HStack>
          <Text>Address: </Text>
          <Text>{user?.address}</Text>
        </HStack>
        <HStack>
          <Text>Contact number: </Text>
          <Text>{user?.phoneNum}</Text>
        </HStack>
      </VStack>
      <Text fontSize="lg">User Orders </Text>
      <FlatList
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1.5, backgroundColor: "lightgray" }} />
        )}
        data={orderList}
        renderItem={({ item }) => (
          <HStack justifyContent="space-between">
            <VStack space={4}>
              <HStack>
                <Text>Order id: </Text>
                <Text>{item.id}</Text>
              </HStack>
              <HStack>
                <Text>Status: </Text>
                <Text>{item.status}</Text>
              </HStack>
              <HStack>
                <Text>Total: </Text>
                <Text>${item.total}</Text>
              </HStack>
            </VStack>
            <Button onPress={() => itemPress(item)}>Details</Button>
          </HStack>
        )}
      />
    </View>
  );
};

export default AdminUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
