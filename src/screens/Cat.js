import React, { useState, useEffect } from "react";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Text,
  Pressable
} from "native-base";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from '../components/ProductList';
import { getAllCats, getAllProds } from "../services/firebase";

const Stack = createNativeStackNavigator();

const Category = ({ navigation }) => {
  const [ categories, setCategories ] = useState()

  const fetchData = async () => {
    const cat = await getAllCats()
    setCategories(cat)
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <Box paddingTop="5">
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Box
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
            paddingLeft="5"
          >
            <Pressable onPress={() => navigation.navigate("ProductList", {category:item.name})}
            rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5" width="80">
              <HStack space="sm" justifyContent="flex-start" paddingLeft="5">
                <Text
                  color="coolGray.800"
                  bold
                  fontSize="32"
                >
                  {item.name}
                </Text>
              </HStack>
            </Pressable>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

const CategoryStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="CategoryScreen" component={Category} options={{ headerShown: false }}/>
      <Stack.Screen name="ProductList" component={ProductList} options={{ title: "" }}/>
    </Stack.Navigator>
  )
}

export default CategoryStack;