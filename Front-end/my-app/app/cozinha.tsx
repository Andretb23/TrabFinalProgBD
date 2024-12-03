import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Ou qualquer outro método para fazer requisições HTTP

const CozinhaScreen = () => {
  // Estado para armazenar os dados da API
  const [responseData, setResponseData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para controle de erros

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ordemProducao/cozinha');
        setResponseData(response.data); // Armazena os dados recebidos no estado
      } catch (err) {
        setError('Erro ao carregar dados da cozinha');
        console.error(err);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchData();
  }, []); // O array vazio [] garante que a requisição aconteça apenas uma vez

  // Função de keyExtractor para o FlatList
  const keyExtractor = (item: any) => item.id_ordem_producao.toString(); // Asegure-se de que a chave é única

  // Renderiza os itens no FlatList
  const renderItem = ({ item }: { item: any }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>Nome do Item: {item.nome_item}</Text>
      <Text>Status da Produção: {item.status_producao}</Text>
      <Text>Data do Pedido: {item.data_pedido}</Text>
    </View>
  );

  if (loading) {
    // Exibe um indicador de carregamento enquanto os dados estão sendo buscados
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    // Exibe uma mensagem de erro, caso ocorra
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={responseData} // Passa os dados para o FlatList
        keyExtractor={keyExtractor} // Define a chave única para cada item
        renderItem={renderItem} // Renderiza os itens da lista
      />
    </View>
  );
};

export default CozinhaScreen;
