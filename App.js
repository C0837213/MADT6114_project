import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import RootStack from "./src/nav/Root";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <RootStack />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
