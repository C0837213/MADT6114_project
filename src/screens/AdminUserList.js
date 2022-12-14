import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { getAllUsers } from "../services/firebase";
import { HStack, Input, Stack, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

const AdminUserList = () => {
  const [userList, setUserList] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [filteredList, setFilteredList] = React.useState([]);
  const navigation = useNavigation();
  React.useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    const res = await getAllUsers();
    const _userList = res.filter((item) => item.type === "user");
    setUserList(_userList);
  };

  const handleItemOnPress = (id) => {
    navigation.navigate("User", { id });
  };

  const handleSearchTextChange = (val) => {
    setInput(val);
    if (val) {
      const filteredList = [...userList].filter((item) =>
        item.username.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredList(filteredList);
    } else {
      setFilteredList([]);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        mx="3"
        placeholder="Please enter username"
        backgroundColor={"white"}
        autoCapitalize="none"
        value={input}
        onChangeText={(val) => handleSearchTextChange(val)}
      />
      <FlatList
        data={input ? filteredList : userList}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1.5, backgroundColor: "lightgray" }} />
        )}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemOnPress(item.id)}>
            <VStack space={4} marginTop={4} marginBottom={4}>
              <HStack space={4}>
                <Text>Username: </Text>
                <Text>{item.username}</Text>
              </HStack>
              <HStack space={4}>
                <Text>User id: </Text>
                <Text>{item.id}</Text>
              </HStack>
            </VStack>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AdminUserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});
