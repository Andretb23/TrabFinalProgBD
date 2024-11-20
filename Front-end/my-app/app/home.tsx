import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

export default function Home() {
  const [items, setItems] = useState([
    { id: 1, nome: "Coca-Cola", preco: 5.0, imagem: "https://via.placeholder.com/150" },
    { id: 2, nome: "Filé Mignon ao Molho Madeira", preco: 30.0, imagem: "https://via.placeholder.com/150" },
    { id: 3, nome: "Frango à Parmegiana", preco: 25.0, imagem: "https://via.placeholder.com/150" },
    { id: 4, nome: "Suco de Laranja", preco: 6.0, imagem: "https://via.placeholder.com/150" },
    { id: 5, nome: "Lasanha de Carne", preco: 28.0, imagem: "https://via.placeholder.com/150" },
    { id: 6, nome: "Cerveja Pilsen", preco: 8.0, imagem: "https://via.placeholder.com/150" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>
      <FlatList
        data={items}
        numColumns={3}  // Exibe 3 itens por linha
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.cardImage} />
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Adicionar à Comanda</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}  // Alinha o conteúdo da lista
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    justifyContent: "center",  // Garante que os itens fiquem bem distribuídos
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 15,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: "30%",  // Cada card ocupa 30% da largura da tela
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
