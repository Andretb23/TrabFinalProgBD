import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

interface ItemCardapio {
  id_item_cardapio: number;
  descricao_item: string;
  nome_item: string;
  tipo_item: number;
  preco: string;
}

export default function Home() {
  const [dados, setDados] = useState<ItemCardapio[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [descricao_item, setDescricaoItem] = useState("");
  const [nome_item, setNomeItem] = useState("");
  const [tipo_item, setTipoItem] = useState("");
  const [preco, setPreco] = useState("");

  const router = useRouter();

  const listar = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/itemcardapio");
      setDados(data);
    } catch (error) {
      console.error("Erro ao buscar os dados: ", error);
    }
  };

  const adicionarItem = async () => {
    if (!descricao_item || !nome_item || !tipo_item || !preco) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/itemcardapio", {
        descricao_item,
        nome_item,
        tipo_item: parseInt(tipo_item),
        preco: parseFloat(preco),
      });

      Alert.alert("Sucesso", "Item adicionado com sucesso!");
      setModalVisible(false);
      listar(); // Atualiza a lista
      limparFormulario();
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao salvar o item.");
      console.error(error);
    }
  };

  const limparFormulario = () => {
    setDescricaoItem("");
    setNomeItem("");
    setTipoItem("");
    setPreco("");
  };

  const adicionarComanda = (item: ItemCardapio) => {
    router.push({
      pathname: "/itemcomanda",
      params: { id_item_cardapio: item.id_item_cardapio },
    });
  };

  useEffect(() => {
    listar();
  }, []);

  const bebidas = dados.filter((item) => item.tipo_item === 1);
  const comidas = dados.filter((item) => item.tipo_item === 2);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <h1>Menu</h1>

        <h2>Comidas</h2>
        <FlatList
          data={comidas}
          keyExtractor={(item) => item.id_item_cardapio.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.itemName}>{item.nome_item}</Text>
              <Text style={styles.itemDescription}>{item.descricao_item}</Text>
              <Text style={styles.itemPrice}>
                R$ {parseFloat(item.preco).toFixed(2)}
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => adicionarComanda(item)}
              >
                <Text style={styles.addButtonText}>Adicionar à Comanda</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <h2>Bebidas</h2>
        <FlatList
          data={bebidas}
          keyExtractor={(item) => item.id_item_cardapio.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.itemName}>{item.nome_item}</Text>
              <Text style={styles.itemDescription}>{item.descricao_item}</Text>
              <Text style={styles.itemPrice}>
                R$ {parseFloat(item.preco).toFixed(2)}
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => adicionarComanda(item)}
              >
                <Text style={styles.addButtonText}>Adicionar à Comanda</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>

      {/* Botão para abrir o modal */}
      <TouchableOpacity
        style={[styles.button, { marginBottom: 20 }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Adicionar Item ao Cardápio</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Adicionar Item ao Cardápio</Text>

            <TextInput
              style={styles.input}
              placeholder="Descrição do Item"
              value={descricao_item}
              onChangeText={setDescricaoItem}
            />
            <TextInput
              style={styles.input}
              placeholder="Nome do Item"
              value={nome_item}
              onChangeText={setNomeItem}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo do Item (1 para Bebidas, 2 para Comidas)"
              value={tipo_item}
              onChangeText={setTipoItem}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Preço"
              value={preco}
              onChangeText={setPreco}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={adicionarItem}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    padding: 10,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    maxWidth: "45%",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  itemDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
    paddingVertical: 5,
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#ff4d4d",
  },
});
