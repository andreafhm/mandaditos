import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Text, Input } from 'react-native-elements';

import firebase from './firebase';
import Moment from 'moment';


const AddPedidoScreen = (props) => {

  const initalState = {
    id_producto: "",
    nombre: "",
    fecha: "",
    precio: "",
    cantidad: "",
    direccion: "",
    entregado: false
  };

  const [state, setState] = useState(initalState);
  const [loading, setLoading] = useState(true);


  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const getProductoById = async (id) => {
    const dbRef = firebase.db.collection("productos").doc(id);
    const doc = await dbRef.get();
    const state = doc.data();
    setState({
      ...state,
      id_producto: doc.id,
      fecha: "",
      precio: state.precio,
      cantidad: "",
      direccion: "",
      descripcion: state.descripcion
    });
    setLoading(false);
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
  const saveNewPedido = async () => {
    if (state.cantidad === "") {
      alert("porfavor ingrese la cantidad");
    } else {

      try {
        await firebase.db.collection("pedidos").add({
          nombre: state.nombre,
          fecha: Moment().format("YYYY-MM-DD"),
          precio: state.precio,
          cantidad: state.cantidad,
          direccion: state.direccion,
          entregado: false
        });

        props.navigation.navigate("PedidoList");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* datos*/}
      <View style={styles.inputGroup}>
        <Text
          h5
        >
          Producto: {state.nombre}
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text
          h6
        >
          Precio: {state.precio}
        </Text>
      </View>
      <View style={styles.inputGroup}>
        <Text
          h6
        >
          Fecha de transacción: {Moment().format("YYYY-MM-DD")}
        </Text>
      </View>


      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput

          placeholder="cantidad"
          onChangeText={(value) => handleChangeText(value, "cantidad")}
          value={state.cantidad}
        />
      </View>
      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Dirección"
          onChangeText={(value) => handleChangeText(value, "direccion")}
          value={state.direccion}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button
          onPress={() => props.navigation.navigate("Location")}
          color="gray"
          title=" ver Coordenadas"

        /></View>

      <View style={styles.inputGroup}>
        <Button title="Agregar Producto" onPress={() => saveNewPedido()} />
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

  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
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
  text: {
    textAlign: 'center',
    padding: 5,
  },
});

export default AddPedidoScreen;