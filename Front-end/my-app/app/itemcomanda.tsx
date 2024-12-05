import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Modal, TextInput, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

interface ItemComanda {
    id_item_comanda: number;
    id_comanda: number;
    item_comanda_cardapio: number;
}

interface Comanda {
    id_comanda: number;
    nome_cliente: number;
    data_abertura: Date; 
    data_fechamento: Date;
    status: boolean;
}


export default function ItemComanda() {
    const [dados, setDados] = useState<Comanda[]>([]); // Estado tipado
    const router = useRouter();
  
    const listar = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/comanda");
        setDados(data); // Atualiza o estado com os dados da API
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
      }
    };

    const selecionarComanda = async (id: number) => {
      try {
        // Obter o ID do item cardápio da URL
        const idItemCardapio_url = obterIdItemCardapio();
        
        if (!idItemCardapio_url) {
          console.error("Parâmetro 'id_item_cardapio' não encontrado na URL.");
          return;
        }
    
        // Fazer a requisição POST
        const response = await axios.post("http://localhost:5000/itemComanda/", {
          id_comanda: id, // Envia o ID da comanda
          item_comanda_cardapio: idItemCardapio_url, // Envia o ID do item de cardápio
        });
    
        console.log("Resposta do servidor:", response.data);
        alert("Comanda selecionada com sucesso!");

        router.push("/home");

      } catch (error) {
        console.error("Erro ao selecionar comanda:", error);
        alert("Erro ao selecionar comanda. Tente novamente.");
      }
    };
    

    const obterIdItemCardapio = (): number | null => {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id_item_cardapio");
      return id ? parseInt(id, 10) : null; // Converte para inteiro ou retorna null se não encontrado
    };
    

    useEffect(() => {
        listar(); // Chama o método ao carregar a tela
    }, []);

    //const comandas = dados;

    const comandas_abertas = dados.filter((item) => item.status === true);
   //const comandas_fechadas = dados.filter((item) => item.status === 2);


    //const selecionarComanda = (item: Comanda) => {
        //router.push({
        //    pathname: "/itemcomanda",
        //    params: { id_item_cardapio: item.id_item_cardapio },
        //});
    //};


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
          <FlatList
            data={comandas_abertas}
            keyExtractor={(item) => item.id_comanda.toString()} // Utiliza o id_comanda como chave
            numColumns={4}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.itemName}>{item.nome_cliente}</Text> {/* Nome do cliente */}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => selecionarComanda(item.id_comanda)} // Chama a função selecionarComanda
                >
                  <Text style={styles.addButtonText}>Selecionar Comanda</Text> {/* Botão de seleção */}
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>

    
        
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
