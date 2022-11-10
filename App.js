import { NavigationContainer } from "@react-navigation/native";

import RootStack from "./src/nav/Root";

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
