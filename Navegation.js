import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';

import Login from "./screens/Login";
import Login2 from "./screens/Login2";
import Register from "./screens/Register";
import Stack from "./screens/Stack";
import Productos from "./screens/Productos";


import CreateProductoScreen from "./screens/CreateProductoScreen";
import ProductoDetailScreen from "./screens/ProductoDetailScreen";
import PedidoListxVendedor from "./screens/PedidoListxVendedor";
import PedidoListxVendedorEditar from "./screens/PedidoListxVendedorEditar";
import PedidoList from "./screens/PedidoList"
import CreatePedidoScreen from "./screens/CreatePedidoScreen"
import CreatePedidoScreenListProducto from "./screens/CreatePedidoScreenListProducto"
import Location from "./screens/Location";
import CameraComponent from "./screens/CameraComponent";





const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="Productos">
            <HomeStackNavigator.Screen
                name="Productos"
                component={Productos} />
            <HomeStackNavigator.Screen
                name="Lista de Pedidos"
                component={PedidoListxVendedor} />

        </HomeStackNavigator.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="MyStack"
            screenOptions={{
                tabBarActiveTintColor: 'purple',
            }}>

            <Tab.Screen
                name="MyStack"
                component={MyStack}
                options={{
                    tabBarLabel: 'Productos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    headerShown: false,
                }}

            />
            <Tab.Screen name="Lista de Pedidos" component={PedidoListxVendedor} />
        </Tab.Navigator>
    )
}

/**export default function Navigation() {
    return (
        <NavigationContainer initialRouteName="Home">
            <Stack.Screen name="Home" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={MyTabs} options={{ headerShown: false }} />
        </NavigationContainer>
    )
}**/
const Stacks = createStackNavigator();

const Navigation = props => {
    return (
        <NavigationContainer>
            <Stacks.Navigator initialRouteName="Login">
                <Stacks.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stacks.Screen name="Login2" component={Login2} options={{ headerShown: false }} />
                <Stacks.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stacks.Screen
                    name="Productos"
                    component={MyTabs}
                    options={{
                        tabBarLabel: 'Productos',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                        headerShown: false,
                    }}

                />
                <Stacks.Screen
                    name="CreateProductoScreen"
                    component={CreateProductoScreen}
                    options={{ title: "Nuevo producto" }}
                />
                <Stacks.Screen
                    name="ProductoDetailScreen"
                    component={ProductoDetailScreen}
                    options={{ title: "Datos de producto" }}
                />
                <Stacks.Screen
                    name="PedidoList"
                    component={PedidoList}
                    options={{ title: "Historial de compras" }}
                />
                <Stacks.Screen
                    name="PedidoListxVendedor"
                    component={PedidoListxVendedor}
                    options={{ title: "Control de entregas" }}
                />
                <Stacks.Screen
                    name="PedidoListxVendedorEditar"
                    component={PedidoListxVendedorEditar}
                    options={{ title: "Modificar estado de entrega" }}
                />
                <Stacks.Screen
                    name="CreatePedidoScreen"
                    component={CreatePedidoScreen}
                    options={{ title: "Agregar nueva compra" }}
                />
                <Stacks.Screen
                    name="CreatePedidoScreenListProducto"
                    component={CreatePedidoScreenListProducto}
                    options={{ title: "Seleccione un producto" }}
                />
                <Stacks.Screen
                    name="Location"
                    component={Location}
                    options={{ title: "Localización" }}
                />
                <Stacks.Screen
                    name="CameraComponent"
                    component={CameraComponent}
                    options={{ title: "Tomar foto" }}
                />
            </Stacks.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;


