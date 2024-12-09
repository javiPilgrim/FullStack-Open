import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#ccc", // Color del borde por defecto
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const inputStyle = [styles.input, style]; // Combina estilos

  return <NativeTextInput style={inputStyle} {...props} />;
};

export default TextInput;
