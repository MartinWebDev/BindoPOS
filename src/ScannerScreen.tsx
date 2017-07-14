import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Camera from 'react-native-camera'; // Need to locate a d.ts file

import { NavigationScreenProp } from 'react-navigation';

interface IProps {
    navigation: NavigationScreenProp<any, any>;
}

interface IState { }

export class ScannerScreen extends Component<IProps, IState> {
    static navigationOptions = ({ navigation, screenProps }: any) => {
        return {
            title: "Product Scanner"
        };
    };

    // Test camera
    camera: any;

    constructor(props: IProps) {
        super(props);
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({ metadata: options })
            .then((data: any) => console.log(data))
            .catch((err: any) => console.error(err));
    }

    handleBarCodeFound(data: any) {
        console.warn(JSON.stringify(data));
        console.log(data);

        this.props.navigation.navigate("AddProduct", {
            barcode: data.data,
            barcodeType: data.type
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam: any) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    barCodeTypes={[
                        "aztec",
                        "code128",
                        "code39",
                        "code39mod43",
                        "code93",
                        "ean13",
                        "vean8",
                        "pdf417",
                        "qr",
                        "upce"
                    ]}
                    onBarCodeRead={this.handleBarCodeFound.bind(this)}
                >

                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </Camera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});
