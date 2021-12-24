import React, { useEffect, useState } from "react";
import { CheckBox } from "react-native-elements";
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

const PedidoListxVendedorEditar = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    precio: "",
    fecha:"",
    cantidad:"",
    direccion : "",
    entregado : false
  };

  const [pedido, setPedido] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [check1, setCheck1] = useState(false);

  const handleTextChange = (value, prop) => {
    setPedido({ ...pedido, [prop]: value });
  };

  const getPedidoById = async (id) => {
    const dbRef = firebase.db.collection("pedidos").doc(id);
    const doc = await dbRef.get();
    const pedido = doc.data();
    setPedido({ ...pedido, id: doc.id });
    setLoading(false);
  };

  
  const updatePedido = async () => {
    const productoRef = firebase.db.collection("pedidos").doc(pedido.id);
    await productoRef.set({
      nombre: pedido.nombre,
      precio: pedido.precio,
      fecha : pedido.fecha,
      cantidad:pedido.cantidad,
      direccion:pedido.direccion,
      entregado:pedido.entregado
    });
    setPedido(initialState);
    props.navigation.navigate("PedidoListxVendedor");
  };

  useEffect(() => {
    getPedidoById(props.route.params.productoId);
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
        <CheckBox
                center
                title="Entregado"
                checked={pedido.entregado}
                onPress={() => handleTextChange(!pedido.entregado,"entregado")}
            />
      </View>
      
      <View>
        <Button title="Guardar estado" onPress={() => updatePedido()} color="#19AC52" />
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

export default PedidoListxVendedorEditar;