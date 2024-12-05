import React from "react";
import { View, StyleSheet } from "react-native";
import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default App;
