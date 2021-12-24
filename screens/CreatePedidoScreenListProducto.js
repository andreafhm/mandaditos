import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import  firebase  from './firebase';


const CreatePedidoScreenListProductoScreen = (props) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    firebase.db.collection("productos").onSnapshot((querySnapshot) => {
      const productos = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, descripcion, precio } = doc.data();
        productos.push({
          id: doc.id,
          nombre,
          descripcion,
          precio
        });
      });
      setProductos(productos);
    });
  }, []);

  

  return (
    <ScrollView>
           
      {productos.map((producto) => {
        return (
          <ListItem
            key={producto.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("CreatePedidoScreen", {
                productoId: producto.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                "https://cdn-icons-png.flaticon.com/512/166/166913.png",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{producto.nombre}</ListItem.Title>
              <ListItem.Subtitle>{producto.descripcion}</ListItem.Subtitle>
              <ListItem.Subtitle> Precio: S/ {producto.precio}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default CreatePedidoScreenListProductoScreen;