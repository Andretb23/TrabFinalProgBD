import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";


interface ItemCardapio {
  id_item_cardapio: number;
  descricao_item: string;
  nome_item: string;
  tipo_item: number;
  preco: string; // Pode ser string ou number, dependendo de como seu backend retorna o preço
}

interface ItemCardapioCardapio { //####### Deve validar na tabela ItemCardapioCardapio o id_item_cardapio_card para repassar á proxima pagina (/itemcomanda) #######
  id_item_cardapio_card: number;
  id_cardapio: number;
  id_item_cardapio: number;
}

export default function Home() {
  const [dados, setDados] = useState<ItemCardapio[]>([]); // Estado tipado
  const router = useRouter();

  const listar = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/itemcardapio");
      setDados(data); // Atualiza o estado com os dados da API
      console.log(data);
    } catch (error) {
      console.error("Erro ao buscar os dados: ", error);
    }
  };

  useEffect(() => {
    listar(); // Chama o método ao carregar a tela
  }, []);

  const bebidas = dados.filter((item) => item.tipo_item === 1);
  const comidas = dados.filter((item) => item.tipo_item === 2);

  const adicionarComanda = (item: ItemCardapio) => { //####### Deve validar na tabela ItemCardapioCardapio o id_item_cardapio_card para repassar á proxima pagina (/itemcomanda) #######
    router.push({
      pathname: "/itemcomanda",
      params: { id_item_cardapio: item.id_item_cardapio }, //####### Alterar ####### Conforme orientado acima
    });
  };

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

        <h2>Bebidas</h2>
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
      </ScrollView>

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
  scrollViewContent: {
    paddingBottom: 20, // Ajuste conforme necessário
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "stretch",
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
