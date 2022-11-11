import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "native-base";
import { Pressable } from "react-native";

import TabViewComponent from "react-native-elements/dist/tab/TabView";

import AdminEdit from "../screens/AdminEdit";
import AdminHome from "../screens/AdminHome";
import AdminOrders from "../screens/AdminOrders";
import { clearLocalUserData } from "../services/asyncStorage";

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
          } else if (route.name === "Orders") {
            iconName = focused
              ? "ios-document-text"
              : "ios-document-text-outline";
          } else if (route.name === "Edit") {
            iconName = focused ? "albums-sharp" : "albums-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary["500"],
        tabBarInactiveTintColor: "gray",
      })}
    >
      <AdminTab.Screen name="Home" component={AdminHome} />
      <AdminTab.Screen name="Edit" component={AdminEdit} />
      <AdminTab.Screen name="Orders" component={AdminOrders} />
    </AdminTab.Navigator>
  );
};

export default AdminBottomTab;
