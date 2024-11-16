import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Restaurant!</Text>
      <Button title="Go to Menu" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
};

export default HomeScreen;
