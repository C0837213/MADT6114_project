import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Avatar } from "react-native-elements";
import RootStack from "./src/nav/Root";

const categories = [
  { id: 1, name: "Grocery" },
  { id: 2, name: "Produce" },
  { id: 3, name: "Meats" },
];

const products = [
  { id: 1, name: "meat", category: 3 },
  { id: 2, name: "yellow potato", category: 2 },
];

function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>
    </View>
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   {/* TODO: SearchBar */}
    //   {/* TODO: CheckOut */}
    //   <FlatList
    //     data={products}
    //     keyExtractor={(item) => item.id}
    //     ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
    //     renderItem={({ item }) => (
    //       <Pressable onPress={(item) => console.log(item)}>
    //         {/* TODO: change to images */}
    //         <View style={styles.row}>
    //           <Avatar
    //             rounded
    //             source={{
    //               uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    //             }}
    //           />
    //           <Text style={styles.text}>{item.name}</Text>
    //         </View>
    //       </Pressable>
    //     )}
    //   />
    // </View>
  );
}

function CatScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Categories</Text>
    </View>
  );
}

function OrderHistory() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Categories</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: "#444",
  },
  text: {
    paddingLeft: 30,
    fontSize: 24,
  },
});
