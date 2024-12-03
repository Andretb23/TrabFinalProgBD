import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
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
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [itensComanda, setItensComanda] = useState<ItemComanda[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [novaComandaModalVisible, setNovaComandaModalVisible] = useState(false);
  const [novoNomeCliente, setNovoNomeCliente] = useState("");

  // Carregar comandas da API
  const carregarComandas = async () => {
    try {
      const response = await axios.get<Comanda[]>(
        "http://localhost:5000/comanda"
      );
      setComandas(response.data);
    } catch (error) {
      console.error("Erro ao carregar comandas:", error);
    }
  };

  const carregarItensComanda = async (idComanda: number, nomeCliente: string) => {
    try {
      const response = await axios.get<ItemComanda[]>(
        `http://localhost:5000/comanda/${idComanda}/itens`
      );
      setItensComanda(response.data);
      setNomeCliente(nomeCliente);
      setModalVisible(true);
    } catch (error) {
      console.error("Erro ao carregar itens da comanda:", error);
    }
  };

  const fecharComanda = async (idComanda: number) => {
    try {
      const dataFechamento = new Date().toISOString();
      await axios.put(`http://localhost:5000/comanda/${idComanda}`, {
        status: false,
        data_fechamento: dataFechamento,
      });
      carregarComandas();
    } catch (error) {
      console.error("Erro ao fechar comanda:", error);
    }
  };

  // Função para criar uma nova comanda
  const criarComanda = async () => {
    if (!novoNomeCliente.trim()) {
      alert("O nome do cliente é obrigatório!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/comanda", {
        nome_cliente: novoNomeCliente,
      });
      alert("Comanda criada com sucesso!");
      setNovaComandaModalVisible(false);
      setNovoNomeCliente("");
      carregarComandas(); // Atualiza a lista de comandas
    } catch (error) {
      console.error("Erro ao criar nova comanda:", error);
      alert("Erro ao criar nova comanda. Verifique o console para mais detalhes.");
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

      {/* Botão "Adicionar Comanda" */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setNovaComandaModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Adicionar Comanda</Text>
      </TouchableOpacity>

      {/* Modal para criar uma nova comanda */}
      <Modal
        visible={novaComandaModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setNovaComandaModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Comanda</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do Cliente"
              value={novoNomeCliente}
              onChangeText={setNovoNomeCliente}
            />
            <Button
              title="Salvar"
              onPress={criarComanda}
              color="#28a745"
            />
            <Button
              title="Cancelar"
              onPress={() => setNovaComandaModalVisible(false)}
              color="#dc3545"
            />
          </View>
        </View>
      </Modal>

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
  addButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
