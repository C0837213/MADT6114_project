import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "../screens/Auth";
import BottomTab from "./Tab";

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
