import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const MenuScreen = ({ navigation }) => {
  const menuItems = [
    { id: '1', name: 'Pizza Margherita', price: 'R$ 30,00' },
    { id: '2', name: 'Hambúrguer', price: 'R$ 25,00' },
    { id: '3', name: 'Lasanha', price: 'R$ 35,00' },
    // Adicione outros itens do cardápio aqui
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            <Button
              title="Adicionar ao Pedido"
              onPress={() => navigation.navigate('Pedido', { item })}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  navigation.navigate('Pedido', {
    item: itemSelecionado, // itemSelecionado é o item que o usuário escolheu
  });
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
});

export default MenuScreen;
