import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, HStack, Input, Stack } from "native-base";
import { storeNewCat } from "../services/firebase";

const AdminEditCat = () => {
  const [catInput, setCatInput] = React.useState("");

  const handleNewCat = async () => {
    const item = { name: catInput };
    await storeNewCat(item);
  };
  return (
    <View style={styles.container}>
      <Stack space={4} w="75%">
        <Input
          size="md"
          placeholder="Enter category name"
          autoCapitalize="none"
          value={catInput}
          onChangeText={setCatInput}
        />
        <HStack justifyContent="center">
          <Button onPress={handleNewCat}>Add new categories</Button>
        </HStack>
      </Stack>
    </View>
  );
};

export default AdminEditCat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
