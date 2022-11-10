import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, Button, HStack, VStack, Stack, Input } from "native-base";
import { useNavigation } from "@react-navigation/native";

const AuthStack = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePass, setRePass] = React.useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("HomeStack");
  };
  return (
    <View style={styles.container}>
      <Stack space={4} w="75%">
        {isLogin ? (
          <>
            <Input size="md" placeholder="username" />
            <Input size="md" placeholder="password" />
            <HStack space={4} justifyContent="center">
              <Button onPress={() => handleLogin()}>Login</Button>
              <Button onPress={() => setIsLogin(false)}>Register</Button>
            </HStack>
          </>
        ) : (
          <>
            <Input size="md" placeholder="username" />
            <Input size="md" placeholder="password" />
            <Input size="md" placeholder="reenter password" />

            <HStack space={4} justifyContent="center">
              <Button onPress={() => setIsLogin(true)}>Back</Button>
              <Button onPress={() => handleLogin()}>Confirm</Button>
            </HStack>
          </>
        )}
      </Stack>
    </View>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
