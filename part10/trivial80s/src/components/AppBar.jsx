import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.colors.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 10,
    flexDirection: "row",
  },
});

const AppBar = () => {

  const navigate = useNavigate(); // Hook para navegación

  return (
    <View style={styles.container}>
      <AppBarTab title="Sign In" onPress={() => navigate("/signin")} />
      <AppBarTab title="Repositorios" onPress={() => navigate("/")} />
    </View>
  );
};

export default AppBar;
