import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import BottomTab from "./Tab";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="Home" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default RootStack;
