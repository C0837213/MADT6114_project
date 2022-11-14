import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    FlatList,
    Avatar,
    HStack,
    VStack,
    Text,
    Spacer,
    Button,
    Input,
    Icon
} from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { getLocalUserData } from "../services/asyncStorage";
import { getCart, addToCart, updateCart, getAllCats, getAllProds } from "../services/firebase";

export default function ProductList({ route }) {
    const [products, setProducts] = useState()
    const [categories, setCategories] = useState()
    const [input, setInput] = useState("")
    const [filteredList, setFilteredList] = useState()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const cat = await getAllCats()
        const prod = await getAllProds()
        setCategories(cat)
        if (route !== undefined) {
            const { category } = route.params
            await setProducts(prod.filter(p => p.catName === category))
        }
        else {
            await setProducts(prod)
        }
    }

    const handleOnCartChange = async (item) => {
        const user = await getLocalUserData()
        const cart = await getCart().then(data => data.filter(e => e.userId === user.id)[0])

        if (!cart) {
            await addToCart({ items: [{ item, quantity: 1 }], userId: user.id })
                .then(alert("Add Success"))
                .catch(e => console.error(e))
        }
        else if (cart.items.find(e => e.item.id === item.id) === undefined) {
            cart.items = [...cart.items, { item, quantity: 1 }]
            await updateCart(cart)
                .then(alert("Update Success"))
                .catch(e => console.error(e))
        }
        else {
            alert("Already in cart")
        }
    }

    const onSearchChange = (text) => {
        setInput(text)
        if (text){
            setFilteredList([...products.filter(e=>e.name.toLowerCase().includes(text.toLowerCase()))])
        }
        else{
            setFilteredList([])
        }
    }

    return (
        <>
            <VStack w="100%" space={5} alignSelf="center">
                <Input
                    placeholder="Search Product" width="100%" borderRadius="4" py="3" px="1" fontSize="14"
                    InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />}
                    value={input}
                    onChangeText={text=>onSearchChange(text)}
                />
            </VStack>
            <FlatList
                data={input? filteredList : products}
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
                                        {categories.filter(i => i.name === item.catName)[0].name}
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
                                <HStack>
                                    <Button colorScheme="success" size="xs" margin="1" onPress={() => handleOnCartChange(item)}>
                                        <Text color="white.100">Add To Cart</Text>
                                    </Button>
                                </HStack>
                            </VStack>
                            <Spacer />
                        </HStack>
                    </Box>
                )}
                keyExtractor={(item) => item.id}
            />
        </>
    )
}