// TELA HOME
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const items = [
  { id: 1, nome: "Coca-Cola", preco: 5.0, imagem: "https://via.placeholder.com/150" },
  { id: 2, nome: "Filé Mignon ao Molho Madeira", preco: 30.0, imagem: "https://via.placeholder.com/150" },
  { id: 3, nome: "Frango à Parmegiana", preco: 25.0, imagem: "https://via.placeholder.com/150" },
  { id: 4, nome: "Suco de Laranja", preco: 6.0, imagem: "https://via.placeholder.com/150" },
  { id: 5, nome: "Lasanha de Carne", preco: 28.0, imagem: "https://via.placeholder.com/150" },
  { id: 6, nome: "Cerveja Pilsen", preco: 8.0, imagem: "https://via.placeholder.com/150" },
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Adicionar à Comanda</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/comanda")}>
          <Text style={styles.buttonText}>Comandas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/cozinha")}>
          <Text style={styles.buttonText}>Cozinha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/copa")}>
          <Text style={styles.buttonText}>Copa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    maxWidth: "30%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  itemPrice: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});
