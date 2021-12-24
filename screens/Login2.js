import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Ellipse, Path, Defs, ClipPath, Rect } from "react-native-svg";

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';


function SvgTop() {
    return (
        <Svg width={527} height={335} fill="none" xmlns="http://www.w3.org/2000/svg">
            <G clipPath="url(#a)">
                <Ellipse cx={413.5} cy={143.5} rx={181.5} ry={189.5} fill="#58BFE6" />
                <Ellipse cx={169} cy={-90.5} rx={319} ry={333.5} fill="#4C525C" />
                <Path
                    d="M244-46c0 104.934-81.26 190-181.5 190S-119 58.934-119-46s81.26-190 181.5-190S244-150.934 244-46Z"
                    fill="#FFAE48"
                />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Rect width={527} height={335} rx={40} fill="#fff" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

const Login2 = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app)

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Inicio Sesion!')
                const user = userCredential.user;
                console.log(user)
                navigation.navigate('Productos')
            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message)
        })
    }




    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <View style={styles.containerSVG}>
                <SvgTop />
            </View>
            <View style={styles.container}>
                <Text style={styles.titulo}> "Mandaditos" </Text>
                <Text style={styles.subtitulo}> ¡Bienvenido Vendedor! Ingresa con tu cuenta </Text>
                <TextInput onChangeText={(text) => setEmail(text)} style={styles.textInput} placeholder="Correo" />
                <TextInput onChangeText={(text) => setPassword(text)} style={styles.textInput} placeholder="Contraseña" secureTextEntry={true} />

                <TouchableOpacity
                    onPress={ handleSignIn }
                    style={{
                        backgroundColor: 'orange',
                        padding: 10,
                        marginTop: "10%",
                        width: "50%",
                        alignSelf: "center",
                        borderRadius: 15,
                    }}>
                    <Text style={{
                        fontSize: 15,
                        textAlign: "center",
                        color: "white",
                    }}>Ingresar</Text>
                </TouchableOpacity>
                <Text style={ [
                         styles.textBody, { fontSize: 15,
                            textAlign: "center",
                            marginTop: "20%", color: 'blue', textDecorationLine: 'underline' }]} onPress={() => navigation.navigate('Login')}> Ingresar como comprador</Text>

                <Text style={{
                    fontSize: 15,
                    textAlign: "center",
                    
                }}>¿No tienes una cuenta?</Text>
                <Text style={[styles.textBody, { color: 'blue', textDecorationLine: 'underline' }]} onPress={() => navigation.navigate('Register')}> Regístrate</Text>
            </View>



            <StatusBar style="auto" />
        </View>
    );
},
    styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: '#f1f1f1',
            flex: 1,
        },
        container: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        containerSVG: {
            width: '72%',
            height: '40%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        titulo: {
            fontSize: 50,
            color: '#34434D',
            fontWeight: 'bold',
            fontStyle: 'italic',
        },
        subtitulo: {
            fontSize: 15,
            color: 'gray',
        },
        textInput: {
            padding: 10,
            paddingStart: 30,
            width: '80%',
            height: 50,
            marginTop: 20,
            borderRadius: 30,
            backgroundColor: '#fff',
        },


    })
export default Login2;