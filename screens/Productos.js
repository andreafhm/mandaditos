import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from './firebase';

const ProductoScreen = (props) => {
    const [productos, setProductos] = useState([]);
  
    useEffect(() => {
        firebase.db.collection("productos").onSnapshot((querySnapshot) => {
        const productos = [];
        querySnapshot.docs.forEach((doc) => {
          const { nombre, descripcion, precio, cantidad } = doc.data();
          productos.push({ // Nombre del producto, Descripción, Precio,  Cantidad ofertada. HOLI
            id: doc.id,
            nombre,
            descripcion,
            precio,
            cantidad
          });
        });
        setProductos(productos);
      });
    }, []);
  
    return (
      <ScrollView>
        <Button
          onPress={() => props.navigation.navigate("CreateProductoScreen")}
          title="Agregar producto"
        />
        {productos.map((producto) => {
          return (
            <ListItem
              key={producto.id}
              bottomDivider
              onPress={() => {
                props.navigation.navigate("ProductoDetailScreen", {
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
                <ListItem.Subtitle>Descripción: {producto.descripcion}</ListItem.Subtitle>
                <ListItem.Subtitle>Precio: S/{producto.precio} Stock disponible: {producto.cantidad}</ListItem.Subtitle>
                
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    );
  };
  
  export default ProductoScreen;