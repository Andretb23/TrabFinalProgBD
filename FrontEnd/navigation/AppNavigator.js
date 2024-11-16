import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen'; // Importando a tela Menu
import PedidoScreen from '../screens/PedidoScreen'; // Importando a tela Pedido

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Pedido" component={PedidoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
