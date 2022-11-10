import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "../screens/AuthStack";

const Stack = createNativeStackNavigator();

const AuthStack = () => { 
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
        <Stack.Screen name="Auth" component={Auth}/>
      ></Stack.Navigator>
    );
}