import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, Button, HStack, VStack, Stack, Input, Radio } from "native-base";
import { useNavigation } from "@react-navigation/native";

const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePass, setRePass] = React.useState("");
  const navigation = useNavigation();
  const [isUser, setIsUser] = React.useState("");

  const resetScreen = () => {
    setIsLogin(true);
    setUsername("");
    setPassword("");
    setRePass("");
  };

  React.useEffect(() => {
    //auto reset screen when reenter auth screen
    const unsubscribe = navigation.addListener("focus", () => {
      resetScreen();
    });

    return unsubscribe;
  }, [navigation]);

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
            <Radio.Group
              value={isUser}
              onChange={(nextValue) => {
                setIsUser(nextValue);
              }}
            >
              <HStack space={4}>
                <Radio value="user" my={1}>
                  User
                </Radio>
                <Radio value="admin" my={1}>
                  Admin
                </Radio>
              </HStack>
            </Radio.Group>
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

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
