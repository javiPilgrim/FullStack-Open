import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Alert,
  StyleSheet,
} from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";
import SignIn from "./components/SignIn";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Reemplaza Redirect con Navigate */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </View>
  );
};

export default Main;
