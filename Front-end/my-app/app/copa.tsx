import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const CopaScreen = () => {
  const [responseData, setResponseData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/ordemProducao/copa/1"); // Supondo tipo_item=1 para copa (bebida)
        setResponseData(response.data);
      } catch (err) {
        setError("Erro ao carregar dados da copa");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const keyExtractor = (item: any) => item.id_ordem_producao ? item.id_ordem_producao.toString() : "";

  const handleFinalizar = async (id: number) => {
    try {
      // Alterando a URL para usar o endpoint correto de finalizar a ordem
      await axios.put(`http://localhost:5000/ordemProducao/finalizar/${id}`);
      setResponseData(prevData =>
        prevData.map(item =>
          item.id_ordem_producao === id ? { ...item, status_producao: 2 } : item
        )
      );
    } catch (err) {
      setError("Erro ao finalizar a ordem");
      console.error(err);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nome do Item: {item.nome_item}</Text>
        <Text style={styles.cardStatus}>
          Status da Produção: {item.status_producao === 1 ? "Em Preparo" : "Finalizado"}
        </Text>
        {item.status_producao !== 2 && (
          <TouchableOpacity style={styles.finalizeButton} onPress={() => handleFinalizar(item.id_ordem_producao)}>
            <Text style={styles.finalizeButtonText}>Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área da Copa</Text>
      <FlatList
        data={responseData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2} // Exibe 2 cards por linha
        columnWrapperStyle={styles.columnWrapper} // Estilo para o alinhamento dos cards
      />
    </View>
  );
};

export default CopaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFA500", // Cor laranja
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 15,
    marginHorizontal: 5, // Espaçamento entre os cards
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    flex: 1, // Faz o card ocupar o espaço disponível de forma proporcional
    maxWidth: "48%", // Garantir que o card ocupe até 48% da largura disponível
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardStatus: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  finalizeButton: {
    backgroundColor: "#FFA500", // Cor laranja
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  finalizeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  noItems: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between', // Espaçamento entre os cards na linha
  },
});
