import React from "react";
import { View, StyleSheet } from "react-native";
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
  return (
    <View style={styles.container}>
      <AppBarTab title="Repositorios" onPress={() => {}} />
    </View>
  );
};

export default AppBar;
