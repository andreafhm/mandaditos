import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from './firebase';

const ProductoDetailScreen = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad:"",
  };

  const [producto, setProducto] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setProducto({ ...producto, [prop]: value });
  };

  const getProductoById = async (id) => {
    const dbRef = firebase.db.collection("productos").doc(id);
    const doc = await dbRef.get();
    const producto = doc.data();
    setProducto({ ...producto, id: doc.id });
    setLoading(false);
  };

  const deleteProducto = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("productos")
      .doc(props.route.params.productoId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("ProductosList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Eliminando producto",
      "está seguro?",
      [
        { text: "SI", onPress: () => deleteProducto() },
        { text: "NO", onPress: () => console.log("cancelado") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateProducto = async () => {
    const productoRef = firebase.db.collection("productos").doc(producto.id);
    await productoRef.set({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad:producto.cantidad,
    });
    setProducto(initialState);
    props.navigation.navigate("ProductosList");
  };

  useEffect(() => {
    getProductoById(props.route.params.productoId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Nombre de producto"
          autoCompleteType="text"
          style={styles.inputGroup}
          value={producto.nombre}
          onChangeText={(value) => handleTextChange(value, "nombre")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="date"
          placeholder="Descripción"
          style={styles.inputGroup}
          value={producto.descripcion}
          onChangeText={(value) => handleTextChange(value, "descripcion")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Precio"
          style={styles.inputGroup}
          value={producto.precio}
          onChangeText={(value) => handleTextChange(value, "precio")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Cantidad"
          style={styles.inputGroup}
          value={producto.cantidad}
          onChangeText={(value) => handleTextChange(value, "cantidad")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Eliminar"
          onPress={() => deleteProducto() }
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Editar" onPress={() => updateProducto()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default ProductoDetailScreen;