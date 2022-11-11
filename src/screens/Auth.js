import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, Button, HStack, VStack, Stack, Input, Radio } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { getAllUsers, storeUser } from "../services/firebase";
import { storeLocalUserData } from "../services/asyncStorage";
import LoadingModal from "../components/LoadingModal";

const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePass, setRePass] = React.useState("");
  const navigation = useNavigation();
  const [type, setType] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
    setLoading(true);
    if (password && username) {
      const currUsers = await getAllUsers();
      let user;
      if (Array.isArray(currUsers)) {
        user = currUsers.find((item) => item.username === username);
      }
      if (user && password === user.password) {
        const res = await storeLocalUserData(user);
        if (res) {
          setLoading(false);
          navigation.navigate("HomeStack");
        }
      } else {
        alert("Password is incorrect");
      }
    } else {
      alert("Please fill in the form");
    }
  };

  const handleRegister = async () => {
    if (password !== rePass) {
      alert("Please enter the same password");
      return;
    }
    if (password === rePass && username && type !== "") {
      //check existing name
      setLoading(true);
      let valid = true;
      const currentUsers = await getAllUsers();
      if (Array.isArray(currentUsers)) {
        currentUsers.forEach((user) => {
          if (user.username === username) {
            valid = false;
          }
        });
        if (valid) {
          const user = {
            id: currentUsers.length,
            username,
            password,
            type,
          };
          const fbResult = await storeUser(user);
          const result = await storeLocalUserData(user);
          if (fbResult && result) {
            setLoading(false);
            resetScreen();
            navigation.navigate("HomeStack", user);
          }
        } else {
          alert("Username have been used.");
        }
      }
    } else {
      alert("Please fill in the form.");
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <LoadingModal /> : null}
      <Stack space={4} w="75%">
        {isLogin ? (
          <>
            <Input
              size="md"
              placeholder="username"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
            <Input
              size="md"
              placeholder="password"
              value={password}
              type="password"
              onChangeText={setPassword}
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
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
            <Input
              size="md"
              placeholder="password"
              value={password}
              autoCapitalize="none"
              type="password"
              onChangeText={setPassword}
            />
            <Input
              size="md"
              value={rePass}
              placeholder="re-enter password"
              autoCapitalize="none"
              type="password"
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
              <Button onPress={() => handleRegister()}>Confirm</Button>
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
