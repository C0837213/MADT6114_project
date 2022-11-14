import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "native-base";
import { Pressable } from "react-native";

import AdminHome from "../screens/AdminHome";
import { clearLocalUserData } from "../services/asyncStorage";
import AdminEditStack from "./AdminEditStack";
import AdminProductStack from "./AdminProductStack";
import AdminUserStack from "./AdminUserStack";

const AdminTab = createBottomTabNavigator();

const AdminBottomTab = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const handleLogout = async () => {
    const res = clearLocalUserData();
    if (true) {
      navigation.navigate("AuthStack");
    }
  };

  return (
    <AdminTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerRight: () => {
          return (
            <Pressable
              style={{ paddingRight: 20 }}
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
          } else if (route.name === "UsersList") {
            iconName = focused ? "man" : "man-outline";
          } else if (route.name === "AdminEdit") {
            iconName = focused ? "albums-sharp" : "albums-outline";
          } else if (route.name === "Product") {
            iconName = focused ? "browsers-sharp" : "browsers-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary["500"],
        tabBarInactiveTintColor: "gray",
      })}
    >
      <AdminTab.Screen name="Home" component={AdminHome} />
      <AdminTab.Screen
        name="Product"
        component={AdminProductStack}
        options={{ headerShown: false }}
      />
      <AdminTab.Screen
        name="AdminEdit"
        component={AdminEditStack}
        options={{ headerShown: false }}
      />
      <AdminTab.Screen
        name="UsersList"
        component={AdminUserStack}
        options={{ headerShown: false }}
      />
    </AdminTab.Navigator>
  );
};

export default AdminBottomTab;
