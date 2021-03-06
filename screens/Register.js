import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Ellipse, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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

const Register = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Cuenta creada')
                const user = userCredential.user;
                console.log(user)
                navigation.navigate('Login')
            })
            .catch(error => {
            console.log(error)
        })
    }
    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <View style={styles.containerSVG}>
                <SvgTop />
            </View>
            <View style={styles.container}>
                <Text style={styles.titulo}> Crea una Cuenta </Text>
                <TextInput onChangeText={(text) => setEmail(text)} style={styles.textInput} placeholder="Correo" />
                <TextInput  onChangeText={(text) => setPassword(text)} style={styles.textInput} placeholder="Contrase??a" secureTextEntry={true} />
                <TextInput style={styles.textInput} placeholder="Tipo de usuario" />

                <TouchableOpacity
                    onPress={handleCreateAccount}
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
                    }}>Registrar</Text>
                </TouchableOpacity>

                <Text style={{
                        fontSize: 15,
                        textAlign: "center",
                        marginTop: "20%"
                }}>??Ya tienes una cuenta? <Text style={[styles.textBody, { color: 'blue', textDecorationLine: 'underline' }]} onPress={() => navigation.navigate('Login')}> Inicia Sesi??n</Text></Text>
                 
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
            width: '100%',
            height: '40%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        titulo: {
            fontSize: 40,
            color: '#34434D',
            fontWeight: 'bold',
            paddingStart: 0,
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
export default Register;