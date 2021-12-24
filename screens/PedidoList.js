import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from './firebase';

const PedidoScreen = (props) => {
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
      <Button
        onPress={() => props.navigation.navigate("CreatePedidoScreenListProducto")}
        title="Agregar pedido"
      />
      {pedidos.map((pedido) => {
        return (
          <ListItem
            key={pedido.id}
            bottomDivider           
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
              activeOpacity={1}
              containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                center
                title="Entregado"
                checked={pedido.entregado}
                disable                
            />
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default PedidoScreen;