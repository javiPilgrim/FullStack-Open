import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  button: {
    marginTop: 16,
  },
});

// Esquema de validación con Yup
const validationSchema = yup.object().shape({
  username: yup.string().required("El nombre de usuario es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log(values); // Registro de valores del formulario
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Nombre de usuario" />
          <FormikTextInput
            name="password"
            placeholder="Contraseña"
            secureTextEntry // Ocultar entrada de texto para contraseñas
          />
          <View style={styles.button}>
            <Button title="Iniciar sesión" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
