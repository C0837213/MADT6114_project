import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createContext } from "react";
import RootStack from "./src/nav/Root";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <RootStack />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

/*
Customer should be able:
•	browse products by category
•	browse all products 
•	search for a specific product
•	add products to a shopping cart
•	checkout
•	check order status
•	create an account to save their personal data (this is optional for the user in case they decide to purchase anything)
Admin user should be able to:
•	add/remove/modify categories of products ✅
•	add/remove/modify products ✅
•	search for a customer information and view their past orders ✅
•	modify a pending order of a customer ✅
•	modify the status of the order (pending/completed/ready for shipment/shipped) ✅
•	check statistics of sales by category and by product (last week, last month, all time, etc)
*/

/*
user new Date().getTime() to store createdAt/updatedAt timestamp
*/
