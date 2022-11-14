import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "native-base";
import { clearLocalUserData } from "../services/asyncStorage";
import { Ionicons } from "@expo/vector-icons";

import AdminUsersList from "../screens/AdminUserList";
import AdminUser from "../screens/AdminUser";
import { Pressable } from "react-native";
import AdminUserOrder from "../screens/AdminUserOrder";

const Stack = createNativeStackNavigator();

const AdminUserStack = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleLogout = async () => {
    const res = await clearLocalUserData();
    if (res) {
      navigation.navigate("AuthStack");
    }
  };

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => {
          return (
            <Pressable onPress={() => handleLogout()}>
              <Ionicons
                name="log-out-outline"
                size={24}
                color={colors.primary["500"]}
              />
            </Pressable>
          );
        },
      })}
    >
      <Stack.Screen name="Users" component={AdminUsersList} />
      <Stack.Screen name="User" component={AdminUser} />
      <Stack.Screen name="UserOrder" component={AdminUserOrder} />
    </Stack.Navigator>
  );
};

export default AdminUserStack;
