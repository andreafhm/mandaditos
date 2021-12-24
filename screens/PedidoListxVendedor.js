import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from './firebase';

const PedidoListxVendedor = (props) => {
  const [pedidos, setPedidos] = useState([]);



  useEffect(() => {    
    firebase.db.collection("pedidos").onSnapshot((querySnapshot) => {
      const pedidos = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, fecha, precio, cantidad, direccion, entregado } = doc.data();
        pedidos.push({ //: Datos del pedido seleccionado, Campo editable para la cantidad que desea comprar, Datos de envío de su perfil
          id: doc.id,
          nombre, //pedido
          precio, //pedido
          fecha,
          cantidad,
          direccion,
          entregado
        });
      });
      setPedidos(pedidos);
    });
  }, []);

  return (
    <ScrollView>
      
      {pedidos.map((pedido) => {
        return (
            <ListItem
            key={pedido.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("PedidoListxVendedorEditar", {
                productoId: pedido.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://cdn-icons-png.flaticon.com/512/1822/1822045.png",
              }}
              rounded
            />
            
            <ListItem.Content>
              <ListItem.Title>{pedido.nombre}</ListItem.Title>
              <ListItem.Subtitle>Fecha: {pedido.fecha}</ListItem.Subtitle>              
              <ListItem.Subtitle>Precio: {pedido.precio}, Cantidad: {pedido.cantidad}</ListItem.Subtitle>
              <ListItem.Subtitle>Dirección: {pedido.direccion}</ListItem.Subtitle>
              <CheckBox
                center
                title="Entregado"
                checked={pedido.entregado}
                onPress={() => {
                    props.navigation.navigate("PedidoListxVendedorEditar", {
                      productoId: pedido.id,
                    });
                  }}
            />
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default PedidoListxVendedor;