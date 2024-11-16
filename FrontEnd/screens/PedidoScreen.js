import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const PedidoScreen = ({ route, navigation }) => {
  const { item } = route.params; // Recebe o item selecionado da tela MenuScreen
  const [pedido, setPedido] = useState([item]); // Inicializa o pedido com o item selecionado

  const adicionarItem = (novoItem) => {
    setPedido([...pedido, novoItem]); // Adiciona um novo item ao pedido
  };

  const finalizarPedido = () => {
    // Lógica para finalizar o pedido, como enviar os dados para o backend ou exibir um resumo
    alert('Pedido finalizado!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedido</Text>
      
      <FlatList
        data={pedido}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <Button
        title="Finalizar Pedido"
        onPress={finalizarPedido}
      />
      <Button
        title="Adicionar Mais Itens"
        onPress={() => navigation.navigate('Menu')} // Volta para o menu para adicionar mais itens
      />
    </View>
  );
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

export default PedidoScreen;
