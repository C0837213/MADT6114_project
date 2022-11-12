import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { Button, HStack, Input, VStack } from "native-base";
import { storeNewPro } from "../services/firebase";

const AdminProduct = () => {
  const { params } = useRoute();
  const catId = params?.cat?.id || "";
  const catName = params?.cat?.name || "";

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");

  const handleClear = () => {
    setName("");
    setPrice("");
    setQuantity("");
  };

  const handleSub = async () => {
    const priceInFloat = parseFloat(price);
    const quantityInInt = parseInt(quantity);
    const splitQ = quantity.split(".");
    const splitPrice = price.split(".");
    if (
      !isNaN(priceInFloat) &&
      !isNaN(quantityInInt)
      //   &&
      //   splitQ.length === 1 &&
      //   splitPrice.length === 2
    ) {
      const prod = { catId, name, price, quantity, catName };
      const res = await storeNewPro(prod);
    }
  };

  return (
    <View style={styles.container}>
      <VStack space={16} w="90%">
        <HStack>
          <Text>Category: </Text>
          <Text>{catName}</Text>
        </HStack>
        <HStack w="90%" alignItems="center" justifyContent="space-between">
          <Text>Product name: </Text>
          <Input
            size="md"
            onChangeText={setName}
            placeholder="Enter product name"
            w="50%"
            value={name}
          />
        </HStack>
        <HStack w="90%" alignItems="center" justifyContent="space-between">
          <Text>Product price: </Text>
          <Input
            size="md"
            onChangeText={setPrice}
            placeholder="Enter product price"
            w="50%"
            value={price}
          />
        </HStack>
        <HStack w="90%" alignItems="center" justifyContent="space-between">
          <Text>Product quantity: </Text>
          <Input
            size="md"
            onChangeText={setQuantity}
            placeholder="Enter product quantity"
            w="50%"
            value={quantity}
          />
        </HStack>

        <HStack space={4} justifyContent="center">
          <Button colorScheme="secondary" onPress={handleClear}>
            Clear
          </Button>
          <Button onPress={handleSub}>Submit</Button>
        </HStack>
      </VStack>
    </View>
  );
};

export default AdminProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
});
