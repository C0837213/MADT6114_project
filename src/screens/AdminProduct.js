import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Badge,
  Button,
  HStack,
  Image,
  Input,
  useNativeBase,
  useTheme,
  VStack,
} from "native-base";
import { storeNewPro, uploadImage } from "../services/firebase";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import LoadingModal from "../components/LoadingModal";

const AdminProduct = () => {
  const { params } = useRoute();
  const item = params.item;
  const catId = params?.cat?.id || item?.catId || "";
  const catName = params?.cat?.name || item?.catName || "";
  const { colors } = useTheme();
  const [name, setName] = React.useState(item ? item.name : "");
  const [price, setPrice] = React.useState(item ? item.price : "");
  const [quantity, setQuantity] = React.useState(item ? item.quantity : "");
  const [image, setImage] = React.useState(item ? item.image : "");
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const handleClear = () => {
    setName("");
    setPrice("");
    setImage("");
    setQuantity("");
  };

  const handleUpload = async (uri) => {
    return await uploadImage(uri);
  };

  const handleSub = async () => {
    if (price && quantity && name && image) {
      setLoading(true);
      let url = "";
      if (image.includes("http")) {
        url = image;
      } else {
        url = await handleUpload(image);
      }
      if (url) {
        await saveProd(url);
      }
    }
  };

  const saveProd = async (url) => {
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
      const prod = { catId, name, price, quantity, catName, image: url };
      const res = await storeNewPro(prod);
      if (res) {
        await setLoading(false);
        await navigation.goBack();
      }
    }
  };

  const importPhoto = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!res.cancelled) {
      setImage(res.uri);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingModal />}
      <VStack space={8} w="90%">
        <HStack alignItems="center" space={40}>
          <Text>Category: </Text>
          {/* <Text>{catName}</Text> */}
          <Badge colorScheme="success" variant="solid">
            {catName}
          </Badge>
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
        <HStack>
          <HStack w="90%" alignItems="center" justifyContent="space-between">
            <Text>Icon:</Text>

            {image ? (
              <Image
                resizeMode="contain"
                src={image}
                alt="image"
                style={{ width: 100, height: 100 }}
              />
            ) : (
              <Button
                onPress={importPhoto}
                variant="outline"
                isDisabled={image}
                style={{ width: 100, height: 100 }}
              >
                Import Icon
              </Button>
            )}
          </HStack>
          {image && (
            <Pressable onPress={() => setImage("")}>
              <MaterialIcons
                name="highlight-remove"
                size={24}
                color={colors.primary["500"]}
              />
            </Pressable>
          )}
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
