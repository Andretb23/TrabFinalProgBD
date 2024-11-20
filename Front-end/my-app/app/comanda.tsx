//TELA DE COMANDA
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function Comanda() {
  const itemsInComanda = [
    { id: 1, nome: "Coca-Cola", preco: 5.0 },
    { id: 2, nome: "Filé Mignon ao Molho Madeira", preco: 30.0 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comanda</Text>
      <FlatList
        data={itemsInComanda}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Fechar Comanda</Text>
      </TouchableOpacity>
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
  card: {
    backgroundColor: "#fff",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
