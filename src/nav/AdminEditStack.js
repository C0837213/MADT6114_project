import AdminEditCat from "../screens/AdminEdit";
import AdminProduct from "../screens/AdminProduct";
import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "native-base";
import { clearLocalUserData } from "../services/asyncStorage";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const AdminEditStack = () => {
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
      <Stack.Screen name="Edit" component={AdminEditCat} />
      <Stack.Screen name="AddProduct" component={AdminProduct} />
    </Stack.Navigator>
  );
};

export default AdminEditStack;
