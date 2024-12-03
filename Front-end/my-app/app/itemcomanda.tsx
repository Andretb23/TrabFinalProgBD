import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from "react-native";
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

    useEffect(() => {
        listar(); // Chama o método ao carregar a tela
    }, []);

    //const comandas = dados;

    const comandas_abertas = dados.filter((item) => item.status === true);
   //const comandas_fechadas = dados.filter((item) => item.status === 2);


    const selecionarComanda = (item: Comanda) => {
        //router.push({
        //    pathname: "/itemcomanda",
        //    params: { id_item_cardapio: item.id_item_cardapio },
        //});
    };


    return (
        <View style={styles.container}>
            <FlatList
              data={comandas_abertas}
              keyExtractor={(item) => item.id_comanda.toString()}
              numColumns={1}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.itemName}>{item.nome_cliente}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => selecionarComanda(item)}
                  >
                    <Text style={styles.addButtonText}>Selecionar Comanda</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
    
    
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
    itemDate: {
        fontSize: 12, 
        color: "#888", 
        fontStyle: "italic", 
        marginBottom: 5, 
        textAlign: "left", 
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
  