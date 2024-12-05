import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import axios from "axios";

interface Comanda {
  id_comanda: number;
  nome_cliente: string;
  data_fechamento: string;
  total: number | null; // Permitimos que total seja null
}

export default function Relatorio() {
  const [dataFiltro, setDataFiltro] = useState("");
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarRelatorio = async () => {
    if (!dataFiltro) {
      alert("Por favor, selecione uma data.");
      return;
    }

    setLoading(true);
    try {
      // Alterei a URL para refletir a rota correta no back-end
      const { data } = await axios.get(`http://localhost:5000/comanda/data/${dataFiltro}`);
      setComandas(data);
    } catch (error) {
      console.error("Erro ao buscar o relatório: ", error);
      alert("Erro ao buscar relatório.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório Diário</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Selecione uma data (YYYY-MM-DD)"
        value={dataFiltro}
        onChangeText={setDataFiltro}
      />

      <TouchableOpacity style={styles.button} onPress={buscarRelatorio}>
        <Text style={styles.buttonText}>Buscar Relatório</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={comandas}
          keyExtractor={(item) => item.id_comanda.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>Cliente: {item.nome_cliente}</Text>
              <Text style={styles.cardText}>
                Data de Fechamento: {new Date(item.data_fechamento).toLocaleDateString("pt-BR")}
              </Text>
              <Text style={styles.cardText}>
                Total: R$ {item.total != null ? parseFloat(item.total.toString()).toFixed(2) : "0.00"} 
                {/* Garantir que total seja convertido para número */}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
});
