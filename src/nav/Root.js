import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import BottomTab from "./Tab";
import AuthStack from "../screens/AuthStack";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="Auth"
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="HomeStack" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default RootStack;
