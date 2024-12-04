import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Modal, TextInput, Alert, ActivityIndicator } from "react-native";
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
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  const router = useRouter();

  // Função para listar os itens do cardápio
  const listar = async () => {
    setLoading(true);  // Marca como carregando
    try {
      const { data } = await axios.get("http://localhost:5000/itemcardapio");
      setDados(data);
    } catch (error) {
      console.error("Erro ao buscar os dados: ", error);
    } finally {
      setLoading(false);  // Marca como carregado
    }
  };

  // Função para adicionar um novo item ao cardápio
  const adicionarItem = async () => {
    if (!descricao_item || !nome_item || !tipo_item || !preco) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    if (isNaN(parseInt(tipo_item)) || isNaN(parseFloat(preco))) {
      Alert.alert("Erro", "Tipo e preço devem ser numéricos.");
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

  // Função para limpar o formulário após adicionar o item
  const limparFormulario = () => {
    setDescricaoItem("");
    setNomeItem("");
    setTipoItem("");
    setPreco("");
  };

  // Função para adicionar item à comanda
  const adicionarComanda = (item: ItemCardapio) => {
    router.push({
      pathname: "/itemcomanda",
      params: { id_item_cardapio: item.id_item_cardapio },
    });
  };

  // UseEffect para carregar os dados do cardápio quando o componente é montado
  useEffect(() => {
    listar();
  }, []);

  // Filtra os itens em categorias (bebidas e comidas)
  const bebidas = dados.filter((item) => item.tipo_item === 1);
  const comidas = dados.filter((item) => item.tipo_item === 2);

  return (
    <View style={styles.container}>
      {/* Barra de Navegação no Topo */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push("/comanda")}>
          <Text style={styles.navButtonText}>Comandas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push("/cozinha")}>
          <Text style={styles.navButtonText}>Cozinha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push("/copa")}>
          <Text style={styles.navButtonText}>Copa</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Menu</Text>

        <Text style={styles.subtitle}>Comidas</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FFA500" />
        ) : (
          <FlatList
            data={comidas}
            keyExtractor={(item) => item.id_item_cardapio.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.itemName}>{item.nome_item}</Text>
                <Text style={styles.itemDescription}>{item.descricao_item}</Text>
                <Text style={styles.itemPrice}>R$ {parseFloat(item.preco).toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => adicionarComanda(item)}
                >
                  <Text style={styles.addButtonText}>Adicionar à Comanda</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        <Text style={styles.subtitle}>Bebidas</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FFA500" />
        ) : (
          <FlatList
            data={bebidas}
            keyExtractor={(item) => item.id_item_cardapio.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.itemName}>{item.nome_item}</Text>
                <Text style={styles.itemDescription}>{item.descricao_item}</Text>
                <Text style={styles.itemPrice}>R$ {parseFloat(item.preco).toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => adicionarComanda(item)}
                >
                  <Text style={styles.addButtonText}>Adicionar à Comanda</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>

      {/* Botão para abrir o modal */}
      <TouchableOpacity
        style={[styles.button, { width: 600 }]} // Definindo um comprimento fixo para o botão
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.buttonText, { fontSize: 12 }]}>Adicionar Item ao Cardápio</Text>
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
              placeholder="Nome do Item"
              value={nome_item}
              onChangeText={setNomeItem}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição do Item"
              value={descricao_item}
              onChangeText={setDescricaoItem}
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
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    marginTop: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 12,
    padding: 10,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFA500",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 6,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#ff4d4d",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
