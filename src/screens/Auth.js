import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, Button, HStack, VStack, Stack, Input, Radio } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { getAllUsers, storeUser } from "../services/firebase";
import { getLocalUserData, storeLocalUserData } from "../services/asyncStorage";
import LoadingModal from "../components/LoadingModal";

const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePass, setRePass] = React.useState("");
  const [address, setAddress] = React.useState("");
  const navigation = useNavigation();
  const [type, setType] = React.useState("user");
  const [loading, setLoading] = React.useState(false);
  const [phoneNum, setPhoneNum] = React.useState("");

  const resetScreen = () => {
    setIsLogin(true);
    setUsername("");
    setPassword("");
    setAddress("");
    setType("user");
    setRePass("");
    setPhoneNum("");
  };

  React.useEffect(() => {
    //auto reset screen when reenter auth screen
    const unsubscribe = navigation.addListener("focus", () => {
      resetScreen();
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    setLoading(true);
    const curUser = await getLocalUserData();
    handleNav(curUser);
    setLoading(false);
  };

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
          handleNav(user);
          setLoading(false);
        }
      } else {
        alert("Password is incorrect");
      }
    } else {
      alert("Please fill in the form");
    }
  };

  const handleNav = (user) => {
    if (user?.type === "user") {
      navigation.navigate("HomeStack");
    } else if (user?.type === "admin") {
      navigation.navigate("AdminStack");
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
            username,
            password,
            type,
          };
          if (type === "user") {
            user.address = address;
            user.phoneNum = phoneNum;
          }
          const _user = await storeUser(user);
          console.log(_user);
          const result = await storeLocalUserData(_user);
          if (_user && result) {
            setLoading(false);
            resetScreen();
            handleNav(user);
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
            {type === "user" ? (
              <Input
                size="md"
                placeholder="enter the address"
                autoCapitalize="none"
                onChangeText={setAddress}
                value={address}
              />
            ) : null}
            {type === "user" ? (
              <Input
                size="md"
                placeholder="enter your phone number"
                autoCapitalize="none"
                value={phoneNum}
                onChangeText={setPhoneNum}
              />
            ) : null}
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
