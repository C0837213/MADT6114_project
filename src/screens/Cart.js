import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  Box,
  HStack,
  VStack,
  Avatar,
  Spacer,
  Button
} from "native-base";
import { Alert, RefreshControl } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { getCart, updateCart, createNewOrder, getAllCats } from "../services/firebase";
import { getLocalUserData } from "../services/asyncStorage";

export default function Cart() {
  const [ cartItems, setCartItems ] = useState()
  const [ cart, setCart ] = useState()
  const [ total, setTotal ] = useState(0)
  const [ categories, setCategories ] = useState()
  const [ refreshing, setRefreshing ] = useState(false);
  
  useEffect(() => {
    getLatestCart()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    getLatestCart().then(setRefreshing(false))
  }

  const getLatestCart = async () => {
    const user = await getLocalUserData()
    const res = await getCart().then(data => data.filter(e => e.userId===user.id)[0])
    const cat = await getAllCats()
    const cartItems = res.items.map(e=>({...e.item, quantity:e.quantity}))
    const total = cartItems.reduce((prev, curr)=>prev+=parseInt(curr.quantity)*parseInt(curr.price), 0)
    setCart(res)
    setCategories(cat)
    setCartItems(cartItems)
    setTotal(total)
  }

  const onCartChange = async (cart) => {
    await updateCart(cart)
    .then(getLatestCart())
    .then(alert("Update Success"))
    .catch(e=>console.error(e))
  }

  const clearCart = async () => {
    let newCart = cart
    newCart.items = []
    onCartChange(newCart)
  }

  const onProductChange = async (productId, qty) => {
    let newCart = cart

    //update item qty
    if (Number.isInteger(qty) && qty > 0) {
      newCart.items.find(e=>e.item.id===productId).quantity=qty
      onCartChange(newCart)
    }
    //remove item
    else if (qty === 0) {
      newCart.items = cart.items.filter(e=>e.item.id!==productId)
      onCartChange(newCart)
    }
    else {
      alert("Please enter valid number")
    }
    
  }

  const onCheckout = async () => {
    const { username, address, id, phoneNum } = await getLocalUserData()
    const order = {
      username,
      address,
      items: cartItems,
      total,
      uid: id,
      status: "pending",
      phoneNum,
      createdAt: new Date().toISOString()
    }
    if (cartItems?.length > 0) {
      await createNewOrder(order)
        .then(clearCart())
        .catch(e=>console.error(e))
    }
    else {
      alert("You have to add at least 1 product")
    }
  }

  return (
    <>
      <FlatList
        data={cartItems}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space="sm" justifyContent="flex-start" paddingLeft="5">
              {item.image ?
                <Avatar
                  size="48px"
                  source={{
                    uri: item.image
                  }}
                /> :
                <MaterialIcons name="local-grocery-store" size={48} color="black" />}
              <VStack>
                <HStack space="sm" justifyContent="flex-start">
                  <Text>Category: </Text>
                  <Text
                    color="coolGray.800"
                    bold
                  >
                    {categories?.filter(i => i.name === item.catName)[0].name}
                  </Text>
                </HStack>
                <HStack space="sm" justifyContent="flex-start">
                  <Text>Product name: </Text>
                  <Text
                    color="coolGray.600"
                  >
                    {item.name}
                  </Text>
                </HStack>
                <HStack space="sm" justifyContent="flex-start">
                  <Text>Price: </Text>
                  <Text
                    color="coolGray.600"
                  >
                    {item.price}
                  </Text>
                </HStack>
                <HStack space="sm" justifyContent="flex-start">
                  <Text>Quantity: </Text>
                  <Text
                    color="coolGray.600"
                  >
                    {item.quantity}
                  </Text>
                </HStack>
                <HStack>
                  <Button colorScheme="success" size="xs" margin="1" onPress={()=>Alert.prompt("Enter the quantity", "", (qty)=>onProductChange(item.id, parseInt(qty)))}>
                    <Text color="white.100">Edit</Text>
                  </Button>
                  <Button colorScheme="warning" size="xs" margin="1" onPress={()=>onProductChange(item.id, 0)}>
                    <Text color="white.100">Remove</Text>
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
      <Box alignSelf="center">
        <HStack space="sm" justifyContent="center">
                    <Text>Total: </Text>
                    <Text
                      color="coolGray.600"
                    >
                      {total}
                    </Text>
                  </HStack>
        <Button colorScheme="primary" size="xs" margin="1" onPress={onCheckout}>
          <Text color="white.100">Checkout</Text>
        </Button>
      </Box>
    </>
  )
} 