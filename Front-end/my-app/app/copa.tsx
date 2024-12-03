import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";

// Definir a interface para os itens da copa
interface ItemCopa {
  id_ordem_producao: number;
  nome_item: string;
  tipo_item: number;
  status_producao: number;
}

export default function Copa() {
  const [itensCopa, setItensCopa] = useState<ItemCopa[]>([]);

  useEffect(() => {
    // Requisição para a rota da copa
    axios
      .get("http://localhost:5000/ordemProducao/copa/1") // Rota de itens para a copa
      .then((response) => {
        setItensCopa(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter itens da copa:", error);
      });
  }, []);

  const renderItem = ({ item }: { item: ItemCopa }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nome_item}</Text>
      <Text style={styles.cardSubtitle}>
        Tipo: {item.tipo_item === 1 ? "Copa" : "Desconhecido"}
      </Text>
      <Text style={styles.cardStatus}>
        Status: {item.status_producao === 1 ? "Em preparo" : "Pronto"}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Atualizar Status</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área da Copa</Text>
      <Text style={styles.subtitle}>Gerencie os pedidos da copa aqui.</Text>
      {itensCopa.length === 0 ? (
        <Text style={styles.noItems}>Nenhum item disponível no momento.</Text>
      ) : (
        <FlatList
          data={itensCopa}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_ordem_producao.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  cardStatus: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  noItems: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
