import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import History from "../screens/History";
import Cat from "../screens/Cat";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "History") {
            iconName = focused
              ? "ios-document-text"
              : "ios-document-text-outline";
          } else if (route.name === "Cat") {
            iconName = focused ? "albums-sharp" : "albums-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cat" component={Cat} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
};

export default BottomTab;
