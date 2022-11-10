import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, Button, HStack, VStack, Stack, Input, Radio } from "native-base";
import { useNavigation } from "@react-navigation/native";
import {
  getData,
  storeUserData,
  USER_DATA_KEY,
} from "../services/asyncStorage";

const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePass, setRePass] = React.useState("");
  const navigation = useNavigation();
  const [type, setType] = React.useState("");

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

  const handleLogin = async () => {
    if (password && username) {
      const currUsers = await getData(USER_DATA_KEY);
      let user;
      if (Array.isArray(currUsers)) {
        user = currUsers.find((item) => item.username === username);
      }
      if (user && password === user.password) {
        navigation.navigate("HomeStack");
      } else {
        alert("Password is incorrect");
      }
    } else {
      alert("Please fill in the form");
    }
  };

  const handleRegister = async () => {
    if (password === rePass && username) {
      //check existing name
      let valid = true;
      const currentUsers = await getData(USER_DATA_KEY);
      if (Array.isArray(currentUsers)) {
        currentUsers.forEach((user) => {
          if (user.username === username) {
            valid = false;
          }
        });
      }
      if (valid) {
        const user = {
          username,
          password,
          type,
        };
        await storeUserData();
      } else {
        alert("Username have been used.");
      }
    } else {
      alert("Please fill in the form.");
    }
  };

  return (
    <View style={styles.container}>
      <Stack space={4} w="75%">
        {isLogin ? (
          <>
            <Input
              size="md"
              placeholder="username"
              onChangeText={setUsername}
            />
            <Input
              size="md"
              placeholder="password"
              type="password"
              onChange={setPassword}
            />
            <HStack space={4} justifyContent="center">
              <Button onPress={() => handleLogin()}>Login</Button>
              <Button
                onPress={() => {
                  setIsLogin(false);
                  setPassword("");
                  setRePass("");
                  setUsername("");
                }}
              >
                Register
              </Button>
            </HStack>
          </>
        ) : (
          <>
            <Input
              size="md"
              placeholder="username"
              onChangeText={setUsername}
            />
            <Input
              size="md"
              placeholder="password"
              type="password"
              onChangeText={setPassword}
            />
            <Input
              size="md"
              placeholder="reenter password"
              onChangeText={setRePass}
            />
            <Radio.Group
              value={type}
              onChange={(nextValue) => {
                setType(nextValue);
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
              <Button
                onPress={() => {
                  setIsLogin(true);
                  setPassword("");
                  setRePass("");
                  setUsername("");
                }}
              >
                Back
              </Button>
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
