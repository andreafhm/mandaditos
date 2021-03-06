import React, { useState, useEffect } from "react";
import {
    Button,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    ActivityIndicator,
} from "react-native";

const Location = (props) => {
    
    const [state, setState] = useState({
        longitud: null,
        latitud: null,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setState({
                    longitud: position.coords.longitude,
                    latitud: position.coords.latitude
                })
            },
            function (error) {
                console.log(error)
            },
            {
                enableHighAccuracy: true
            }
        );
    });
    return (<ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <TextInput
                placeholder="Latitud"
                value={"Latitud: "+state.latitud}
            />
        </View>
        <View style={styles.inputGroup}>
            <TextInput
                placeholder="Longitud"
                multiline={true}
                value={"Longitud: "+state.longitud}
            />
        </View>
        <View style={styles.button}>
            <Button
                onPress={() => props.navigation.navigate("CreatePedidoScreen")}
                title="Volver"
            />
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

export default Location;
