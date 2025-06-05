import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import OrderSummaryScreen from './screens/OrderSummaryScreen';

const Stack = createStackNavigator();

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu">
          {(props) => (
            <MenuScreen
              {...props}
              cart={cart}
              setCart={setCart}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {(props) => (
            <CartScreen
              {...props}
              cart={cart}
              updateCart={setCart}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="OrderSummary">
          {(props) => (
            <OrderSummaryScreen
              {...props}
              cart={cart}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
