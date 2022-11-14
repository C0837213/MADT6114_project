import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "native-base";
import { Pressable } from "react-native";
import { createContext, useState } from "react";

import Cat from "../screens/Cat";
import History from "../screens/History";
import Home from "../screens/Home";
import Cart from "../screens/Cart"
import { clearLocalUserData } from "../services/asyncStorage";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const handleLogout = async () => {
    const res = clearLocalUserData();
    if (true) {
      navigation.navigate("AuthStack");
    }
  };
  

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerRight: () => {
            return (
              <Pressable
                style={{ paddingRight: 16 }}
                onPress={() => handleLogout()}
              >
                <Ionicons
                  name="log-out-outline"
                  size={24}
                  color={colors.primary["500"]}
                />
              </Pressable>
            );
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch(route.name){
              case "Products": iconName = focused ? "home" : "home-outline"; break;
              case "History": iconName = focused ? "ios-document-text" : "ios-document-text-outline"; break;
              case "Category": iconName = focused ? "albums-sharp" : "albums-outline"; break;
              case "Cart": iconName = focused ? "cart" : "cart-outline"; break;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary["500"],
          tabBarInactiveTintColor: "gray",
        })}
      >
      
        <Tab.Screen name="Products" component={Home} />
        <Tab.Screen name="Category" component={Cat} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
  );
};

export default BottomTab;
