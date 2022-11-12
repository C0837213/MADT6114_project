import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, HStack, Input, Stack, VStack } from "native-base";
import {
  getAllCats,
  removeCat,
  storeNewCat,
  updateCat,
} from "../services/firebase";
import LoadingModal from "../components/LoadingModal";
import { useNavigation } from "@react-navigation/native";

const AdminEditCat = () => {
  const [catInput, setCatInput] = React.useState("");
  const [catList, setCatList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [editCat, setEditCat] = React.useState(null);
  const navigate = useNavigation();
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    getCatList();
  }, []);

  const getCatList = async () => {
    const res = await getAllCats();
    if (Array.isArray(res)) {
      setCatList(res);
      setLoading(false);
      setIsFetching(false);
    }
  };

  const handleNewCat = async () => {
    setLoading(true);
    const item = { name: catInput };
    const res = await storeNewCat(item);
    if (res) {
      await getCatList();
    }
  };

  const handleDel = async (item) => {
    setLoading(true);
    const res = await removeCat(item);
    if (res) {
      await getCatList();
    }
  };

  const handleSubmitEdit = async () => {
    setLoading(true);
    const _item = { ...editCat, name: catInput };
    const res = await updateCat(_item);
    if (res) {
      await getCatList();
      await setCatInput("");
      await setEditCat(null);
    }
  };

  const handleEdit = (item) => {
    setEditCat(item);
    setCatInput(item.name);
  };

  const handleClear = () => {
    setCatInput("");
    setEditCat(null);
  };

  const AddProduct = (item) => {
    navigate.navigate("AddProduct", { cat: item });
  };

  const onRefresh = () => {
    setIsFetching(true);
    getCatList();
  };

  return (
    <View style={styles.container}>
      {loading ? <LoadingModal /> : null}
      <Stack space={4} w="90%" h="100%">
        <FlatList
          refreshing={isFetching}
          onRefresh={() => onRefresh()}
          data={catList}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1.5, backgroundColor: "lightgray" }} />
          )}
          renderItem={({ item }) => (
            <HStack
              justifyContent="space-between"
              alignItems="center"
              style={{ marginVertical: 8 }}
            >
              <Text style={{ minWidth: 100 }}>{item.name}</Text>
              <HStack space={3}>
                <Button onPress={() => AddProduct(item)}>+ Product</Button>
                <Button
                  onPress={() => handleEdit(item)}
                  variant={editCat?.id === item.id ? "subtle" : "outline"}
                >
                  Edit
                </Button>
                <Button colorScheme="secondary" onPress={() => handleDel(item)}>
                  Delete
                </Button>
              </HStack>
            </HStack>
          )}
        />
        <Input
          size="md"
          placeholder="Enter category name"
          autoCapitalize="none"
          value={catInput}
          onChangeText={setCatInput}
        />
        <HStack justifyContent="center" space={4}>
          <Button onPress={!editCat ? handleNewCat : handleSubmitEdit}>{`${
            !editCat ? "Add new" : "Edit"
          } categories`}</Button>
          {editCat ? (
            <Button variant="outline" onPress={handleClear}>
              Clear
            </Button>
          ) : null}
        </HStack>
      </Stack>
    </View>
  );
};

export default AdminEditCat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
});
