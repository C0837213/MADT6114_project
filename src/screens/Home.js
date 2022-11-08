import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";

const Home = () => {
  const categories = [
    { id: 1, name: "Grocery" },
    { id: 2, name: "Produce" },
    { id: 3, name: "Meats" },
  ];

  const products = [
    { id: 1, name: "meat", category: 3 },
    { id: 2, name: "yellow potato", category: 2 },
  ];
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* TODO: SearchBar */}
      {/* TODO: CheckOut */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        renderItem={({ item }) => (
          <Pressable onPress={(item) => console.log(item)}>
            {/* TODO: change to images */}
            <View style={styles.row}>
              <Avatar
                rounded
                source={{
                  uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                }}
              />
              <Text style={styles.text}>{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  itemSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: "#444",
  },
});
