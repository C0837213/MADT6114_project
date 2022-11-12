import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { getAllProds } from "../services/firebase";
import LoadingModal from "../components/LoadingModal";
import { Badge, HStack, Stack, VStack } from "native-base";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AdminProductList = () => {
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    //auto reset screen when reenter auth screen
    const unsubscribe = navigation.addListener("focus", () => {
      fetchList();
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    setLoading(true);
    const res = await getAllProds();
    if (Array.isArray(res)) {
      setList(res);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? <LoadingModal /> : null}
      <Stack space={4} w="100%" h="100%">
        <FlatList
          data={list}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1.5, backgroundColor: "lightgray" }} />
          )}
          renderItem={({ item }) => (
            <HStack alignItems="center" space={4}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <VStack space={4} marginTop={4} marginBottom={4}>
                <HStack>
                  <Text>Name: </Text>
                  <Text>{item.name}</Text>
                </HStack>
                <HStack alignItems="center">
                  <Text>Category: </Text>
                  <Badge variant="solid">{item.catName}</Badge>
                </HStack>
                <HStack>
                  <Text>Price: </Text>
                  <Text>${item.price}</Text>
                </HStack>
                <HStack>
                  <Text>Quantity: </Text>
                  <Text>{item.quantity}</Text>
                </HStack>
              </VStack>
            </HStack>
          )}
        />
      </Stack>
    </View>
  );
};

export default AdminProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
