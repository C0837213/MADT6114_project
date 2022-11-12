import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "native-base";
import { Pressable } from "react-native";
import AdminProduct from "../screens/AdminProduct";
import AdminProductList from "../screens/AdminProductList";
import { clearLocalUserData } from "../services/asyncStorage";

const Stack = createNativeStackNavigator();

const AdminProductStack = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleLogout = async () => {
    const res = clearLocalUserData();
    if (true) {
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
      <Stack.Screen name="ProductList" component={AdminProductList} />
      <Stack.Screen name="Edit" component={AdminProduct} />
    </Stack.Navigator>
  );
};

export default AdminProductStack;
