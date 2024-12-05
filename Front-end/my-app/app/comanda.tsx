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
  total: number;
}

export default function Comanda() {
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [itensComanda, setItensComanda] = useState<ItemComanda[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [novaComandaModalVisible, setNovaComandaModalVisible] = useState(false);
  const [novoNomeCliente, setNovoNomeCliente] = useState("");
  const [modalEncerramentoVisible, setModalEncerramentoVisible] = useState(false);
  const [valorTotalComanda, setValorTotalComanda] = useState<number | null>(null);


  // Carregar comandas da API
  const carregarComandas = async () => {
    try {
      const response = await axios.get<Comanda[]>("http://localhost:5000/comanda");
      setComandas(response.data);
    } catch (error) {
      console.error("Erro ao carregar comandas:", error);
    }
  };

  // Carregar itens da comanda
  const carregarItensComanda = async (idComanda: number, nomeCliente: string) => {
    try {
      const response = await axios.get<ItemComanda[]>(`http://localhost:5000/comanda/${idComanda}/itens`);
      setItensComanda(response.data);
      setNomeCliente(nomeCliente);
      setModalVisible(true);
    } catch (error) {
      console.error("Erro ao carregar itens da comanda:", error);
    }
  };

  // Função para encerrar a comanda
  const encerrarComanda = async (idComanda: number) => {
    try {
      await axios.put(`http://localhost:5000/comanda/fechar/${idComanda}`);
      const response = await axios.get(`http://localhost:5000/comanda/${idComanda}/total`);
  
      console.log("Retorno completo da API (response.data):", response.data); // Adiciona o log completo
  
      // Acessa o total no primeiro elemento do array
      const total = response.data[0]?.total
        ? parseFloat(response.data[0].total)
        : 0;
  
      setValorTotalComanda(total); // Atualiza o estado com o valor correto
      setModalEncerramentoVisible(true); // Abre o modal de encerramento
      carregarComandas(); // Atualiza a lista de comandas
    } catch (error) {
      console.error("Erro ao encerrar comanda:", error);
      alert("Erro ao encerrar comanda");
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
        keyExtractor={(item) => (item?.id_comanda ? item.id_comanda.toString() : Math.random().toString())}
        numColumns={2} // Adicionado para ter dois cards por linha
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
                  onPress={() => encerrarComanda(item.id_comanda)}
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
              color="#FFA500" // Laranja
            />
            <Button
              title="Cancelar"
              onPress={() => setNovaComandaModalVisible(false)}
              color="#dc3545"
            />
          </View>
        </View>
      </Modal>

      {/* Modal de Sucesso ao encerrar a comanda */}
      <Modal
      visible={modalEncerramentoVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalEncerramentoVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Comanda Encerrada</Text>
          <Text style={styles.modalSubtitle}>Comanda fechada com sucesso!</Text>
          <Text style={styles.modalSubtitle}>
            Total: R$ {(valorTotalComanda ?? 0).toFixed(2)}
          </Text>
          <Button
            title="Fechar"
            onPress={() => setModalEncerramentoVisible(false)}
            color="#FFA500" // Laranja
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
              color="#FFA500"
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
    marginRight: 10, // Adicionado para dar espaçamento entre os cards
    width: "48%", // Ajustado para dois cards por linha
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
    backgroundColor: "#FFA500", // Laranja
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
    color: "#FFA500", // Laranja
  },
  addButton: {
    backgroundColor: "#FFA500", // Laranja
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
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
});

