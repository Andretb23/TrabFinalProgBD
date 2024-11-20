// TELA COPA
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Copa() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área da Copa</Text>
      <Text style={styles.subtitle}>Gerencie os pedidos da copa aqui.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
});