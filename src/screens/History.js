import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  Box,
  HStack,
  VStack,
} from "native-base";
import { getOrder } from "../services/firebase";
import { getLocalUserData } from "../services/asyncStorage";

const History = () => {
  const [ order, setOrder ] = useState()

  const fetchData = async () => {
    const user = await getLocalUserData()
    const orders = await getOrder().then(data=>data.filter(e=>e.uid===user.id))
    setOrder(orders)
  }

  useEffect(()=>{
    fetchData()
  }, [order])

  return (
    <>
      <FlatList
        data={order}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space="sm" justifyContent="flex-start" paddingLeft="5">
              <VStack>
                <HStack space="sm" justifyContent="flex-start">
                  <Text>Order Id: </Text>
                  <Text
                    color="coolGray.800"
                    bold
                  >
                    {item.id}
                  </Text>
                </HStack>
                <HStack space="sm" justifyContent="flex-start">
                  <Text>Address: </Text>
                  <Text
                    color="coolGray.600"
                  >
                    {item.address}
                  </Text>
                </HStack>
                <HStack space="sm" justifyContent="flex-start">
                  <Text>Total: </Text>
                  <Text
                    color="coolGray.600"
                  >
                    {item.total}
                  </Text>
                </HStack>
                <HStack space="sm" justifyContent="flex-start">
                  <Text>Phone Number: </Text>
                  <Text
                    color="coolGray.600"
                  >
                    {item.phoneNum}
                  </Text>
                </HStack>
                <HStack space="sm" justifyContent="flex-start">
                  <Text>Status: </Text>
                  <Text
                    color="coolGray.600"
                  >
                    {item.status}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  )
};

export default History;
