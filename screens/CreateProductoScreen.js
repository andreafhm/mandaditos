import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import firebase from './firebase';

const AddProductoScreen = (props) => {
  const initalState = { // 
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewProducto = async () => {
    if (state.nombre === "") {
      alert("Favor de proveer el nombre del producto");
    } else {

      try {
        await firebase.db.collection("productos").add({
          nombre: state.nombre,
          descripcion: state.descripcion,
          precio: state.precio,
          cantidad: state.cantidad,
        });

        props.navigation.navigate("ProductosList");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre del producto"
          onChangeText={(value) => handleChangeText(value, "nombre")}
          value={state.nombre}
        />
      </View>

      {/* Birthday Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Decripción"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "descripcion")}
          value={state.descripcion}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Precio S/"
          onChangeText={(value) => handleChangeText(value, "precio")}
          value={state.precio}
        />
      </View>
      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Cantidad"
          onChangeText={(value) => handleChangeText(value, "cantidad")}
          value={state.cantidad}
        />
      </View>


      <View style={styles.inputGroup}>
        <Button title="Tomar Foto"
          color="#19AC52"
          onPress={() => props.navigation.navigate("CameraComponent")} />
      </View>

      <View style={styles.inputGroup}>
        <Button title="Agregar Producto" onPress={() => saveNewProducto()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddProductoScreen;