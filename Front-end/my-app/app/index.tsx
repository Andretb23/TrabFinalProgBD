import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";  
import { useRouter } from "expo-router";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome"; 
import Toast from "react-native-toast-message"; 

interface Usuario {
  id: number;
  nome: string;
  login: string;
  senha: string;
  tipo_usuario: number;
  ativo: boolean;
}

export default function Login() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("1");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [nome, setNome] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");  // Estado para a senha de cadastro
  const [senhaVisivelCadastro, setSenhaVisivelCadastro] = useState(false); // Estado para visibilidade da senha de cadastro
  const router = useRouter();

  const handleLogin = async () => {
    if (!login || !senha) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: 'Preencha todos os campos.',
      });
      return;
    }

    try {
      const response = await axios.get<Usuario[]>("http://localhost:5000/usuario");
      const usuarios = response.data;

      const usuarioEncontrado = usuarios.find(
        (user: Usuario) => user.login === login && user.senha === senha
      );

      if (usuarioEncontrado) {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Sucesso',
          text2: 'Login realizado com sucesso!',
        });
        router.push("/home");
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erro',
          text2: 'Usuário ou senha inválidos.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: 'Não foi possível conectar ao servidor.',
      });
      console.error(error);
    }
  };

  const handleCadastro = async () => {
    if (!nome || !login || !senhaCadastro) {  // Alterado para senhaCadastro
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: 'Preencha todos os campos.',
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/usuario", {
        nome,
        login,
        senha: senhaCadastro, // Alterado para senhaCadastro
        tipo_usuario: parseInt(selectedUserType, 10),
        ativo: true,
      });

      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Sucesso',
          text2: 'Cadastro efetuado com sucesso!',
        });
        setModalVisible(false);
        setNome("");
        setLogin("");
        setSenhaCadastro("");  // Limpa o campo de senha após cadastro
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erro',
          text2: 'Não foi possível cadastrar o usuário.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: 'Erro ao conectar ao servidor.',
      });
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#999"
          value={login}
          onChangeText={setLogin}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry={!senhaVisivel} 
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity
            onPress={() => setSenhaVisivel(!senhaVisivel)}
            style={styles.showPasswordButton}
          >
            <Icon
              name={senhaVisivel ? "eye" : "eye-slash"}
              size={20}
              color="#007bff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para cadastro */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cadastrar Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Login"
              placeholderTextColor="#999"
              value={login}
              onChangeText={setLogin}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry={!senhaVisivelCadastro}  // Usando senhaVisivelCadastro
                value={senhaCadastro}  // Usando senhaCadastro
                onChangeText={setSenhaCadastro}
              />
              <TouchableOpacity
                onPress={() => setSenhaVisivelCadastro(!senhaVisivelCadastro)} // Alternando senhaVisivelCadastro
                style={styles.showPasswordButton}
              >
                <Icon
                  name={senhaVisivelCadastro ? "eye" : "eye-slash"}
                  size={20}
                  color="#007bff"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Tipo de Usuário</Text>
            <Picker
              selectedValue={selectedUserType}
              onValueChange={(itemValue) => setSelectedUserType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Administrador (1)" value="1" />
              <Picker.Item label="Garçom (2)" value="2" />
              <Picker.Item label="Cozinheiro (3)" value="3" />
              <Picker.Item label="Copeiro (4)" value="4" />
            </Picker>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  box: {
    width: "80%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  showPasswordButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#6c757d",
    borderWidth: 0,
    elevation: 0,   
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  }
});
