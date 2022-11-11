import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Text } from "native-base";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Cat from "../screens/Cat";
import History from "../screens/History";
import Home from "../screens/Home";
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
        tabBarActiveTintColor: colors.primary["500"],
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
