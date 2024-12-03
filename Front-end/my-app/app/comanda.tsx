import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import axios from "axios";

// Tipagem para os itens da comanda
interface ItemComanda {
  id_item_comanda: number;
  nome_item: string;
  preco: string;
}

// Tipagem para as comandas
interface Comanda {
  id_comanda: number;
  nome_cliente: string;
  status: boolean;
}

export default function Comanda() {
  const [comandas, setComandas] = useState<Comanda[]>([]); // Tipagem de comandas
  const [itensComanda, setItensComanda] = useState<ItemComanda[]>([]); // Tipagem dos itens da comanda
  const [modalVisible, setModalVisible] = useState(false); // Controle do modal
  const [nomeCliente, setNomeCliente] = useState(""); // Nome do cliente para exibir no modal

  // Carregar comandas da API
  const carregarComandas = async () => {
    try {
      const response = await axios.get<Comanda[]>(
        "http://localhost:5000/comanda"
      ); // Tipagem da resposta da API
      setComandas(response.data);
    } catch (error) {
      console.error("Erro ao carregar comandas:", error);
    }
  };

  // Carregar itens da comanda
  const carregarItensComanda = async (idComanda: number, nomeCliente: string) => {
    try {
      const response = await axios.get<ItemComanda[]>(
        `http://localhost:5000/comanda/${idComanda}/itens`
      ); // Tipagem da resposta
      setItensComanda(response.data);
      setNomeCliente(nomeCliente); // Define o nome do cliente para exibir no modal
      setModalVisible(true); // Exibe o modal
    } catch (error) {
      console.error("Erro ao carregar itens da comanda:", error);
    }
  };

  // Fechar a comanda
  const fecharComanda = async (idComanda: number) => {
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
        keyExtractor={(item) =>
          item?.id_comanda ? item.id_comanda.toString() : Math.random().toString()
        }
        renderItem={({ item }: { item: Comanda }) => (
          <View style={styles.card}>
            <Text style={styles.itemName}>{item.nome_cliente}</Text>
            <Text style={styles.itemStatus}>
              Status: {item.status ? "Aberta" : "Fechada"}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  carregarItensComanda(item.id_comanda, item.nome_cliente)
                }
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

      {/* Modal para exibir os itens da comanda */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Itens da Comanda</Text>
            <Text style={styles.modalSubtitle}>Cliente: {nomeCliente}</Text>
            <FlatList
              data={itensComanda}
              keyExtractor={(item) =>
                item?.id_item_comanda
                  ? item.id_item_comanda.toString()
                  : Math.random().toString()
              }
              renderItem={({ item }: { item: ItemComanda }) => (
                <View style={styles.itemCard}>
                  <Text style={styles.itemName}>{item.nome_item}</Text>
                  <Text style={styles.itemPrice}>
                    R$ {parseFloat(item.preco).toFixed(2)}
                  </Text>
                </View>
              )}
            />
            <Button
              title="Fechar"
              onPress={() => setModalVisible(false)}
              color="#007bff"
            />
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  itemCard: {
    width: "100%",
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: "#007bff",
  },
});
