import React from "react";
import { View, StyleSheet, ScrollView  } from "react-native";
import { useNavigate } from "react-router-native";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import Constants from "expo-constants"; // Importar Constants

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight, 
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 10,
    flexDirection: "row",
  },
  scrollContainer: {
    flexDirection: "row", // Organiza los tabs en fila
  },
});

const AppBar = () => {
  const navigate = useNavigate(); // Hook para navegación

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true} // Oculta el indicador de desplazamiento
        contentContainerStyle={styles.scrollContainer}
      >
        <AppBarTab title="Sign In" onPress={() => navigate("/signin")} />
        <AppBarTab title="Repositorios" onPress={() => navigate("/")} />
      </ScrollView>
  </View>
  );
};

export default AppBar;
