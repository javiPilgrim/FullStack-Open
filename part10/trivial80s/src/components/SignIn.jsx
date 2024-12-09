import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Formik } from "formik";

import FormikTextInput from "./FormikTextInput";
import { Text } from "react-native"; // Importación correcta de Text

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
});

const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "El nombre de usuario es obligatorio";
    }
    if (!values.password) {
      errors.password = "La contraseña es obligatoria";
    }
    return errors;
  };

  const onSubmit = (values) => {
    console.log(values); // Registro de valores del formulario
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate} // Validaciones personalizadas
    >
      {({ handleSubmit, errors }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Nombre de usuario" />
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          <FormikTextInput
            name="password"
            placeholder="Contraseña"
            secureTextEntry // Ocultar entrada de texto para contraseñas
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          <View style={styles.button}>
            <Button title="Iniciar sesión" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
