import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraComponent(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    takePicture = () => {
        if (this.camera) {
            this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
        }
     };
  
    onPictureSaved = photo => {
        console.log(photo);
        props.navigation.navigate("CreateProductoScreen");
    } 

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={(ref) => { this.camera = ref }}>
                <View style={{paddingVertical: 7,
                    backgroundColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}>Voltear la cámara</Text>
                    </TouchableOpacity>
                </View>
                <View>

                </View>
                <View style={{
                paddingVertical: 7,
                    backgroundColor: '#19AC52',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        //onPress={() => props.navigation.navigate("CreateProductoScreen")}
                        onPress={this.takePicture}
                    >
                        <Text style={styles.text}>Tomar Foto</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
