import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";

export default function Comanda() {
  const [comandas, setComandas] = useState([]);
  const [itensComanda, setItensComanda] = useState([]);
  
  // Carregar comandas da API
  const carregarComandas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/comanda");
      setComandas(response.data);
    } catch (error) {
      console.error("Erro ao carregar comandas:", error);
    }
  };

  // Carregar itens da comanda
  const carregarItensComanda = async (idComanda) => {
    try {
      const response = await axios.get(`http://localhost:5000/comanda/${idComanda}/itens`);
      setItensComanda(response.data);
    } catch (error) {
      console.error("Erro ao carregar itens da comanda:", error);
    }
  };

  // Fechar a comanda
  const fecharComanda = async (idComanda) => {
    try {
      await axios.patch(`http://localhost:5000/comanda/${idComanda}/fechar`);
      carregarComandas(); // Recarregar a lista de comandas após fechamento
    } catch (error) {
      console.error("Erro ao fechar comanda:", error);
    }
  };

  useEffect(() => {
    carregarComandas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comandas</Text>
      <FlatList
        data={comandas}
        keyExtractor={(item) => item.id_comanda.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemName}>{item.nome_cliente}</Text>
            <Text style={styles.itemStatus}>
              Status: {item.status ? "Aberta" : "Fechada"}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => carregarItensComanda(item.id_comanda)}
              >
                <Text style={styles.buttonText}>Ver Itens</Text>
              </TouchableOpacity>
              {item.status && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => fecharComanda(item.id_comanda)}
                >
                  <Text style={styles.buttonText}>Fechar Comanda</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
      {itensComanda.length > 0 && (
        <View style={styles.itensContainer}>
          <Text style={styles.itensTitle}>Itens da Comanda:</Text>
          <FlatList
            data={itensComanda}
            keyExtractor={(item) => item.id_item_comanda.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.itemName}>{item.nome_item}</Text>
                <Text style={styles.itemPrice}>R$ {parseFloat(item.preco).toFixed(2)}</Text>
              </View>
            )}
          />
        </View>
      )}
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
  itemStatus: {
    fontSize: 16,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flex: 1,
    marginRight: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  itensContainer: {
    marginTop: 20,
    padding: 10,
  },
  itensTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 16,
    marginTop: 5,
    color: "#007bff",
  },
});
