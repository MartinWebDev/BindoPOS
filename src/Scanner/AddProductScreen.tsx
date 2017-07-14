// Import react stuff
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ViewStyle,
    TextStyle
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Import data and services
import { ProductService } from '../Services/ProductService';
import { IProduct } from '../ClientData/IProduct';

interface IProps {
    navigation: NavigationScreenProp<any, any>
}

interface IState {
    barcodeType: string;
    barcodeValue: string;
    productName: string;

    prodSrv: ProductService;
}

export class AddProductScreen extends Component<IProps, IState> {
    static navigationOptions = ({ navigation, screenProps }: any) => {
        return {
            title: "Add Product"
        };
    };

    constructor(props: IProps) {
        super(props);

        const { state, setParams } = this.props.navigation;
        const { barcode } = state.params;
        const { barcodeType } = state.params;

        this.state = {
            barcodeValue: barcode,
            barcodeType: barcodeType,
            productName: "",
            prodSrv: new ProductService()
        };
    }

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <View style={styles.upper} key="KnownVariables">
                    <Text>{this.state.barcodeType}</Text>
                    <Text>{this.state.barcodeValue}</Text>
                </View>

                <View style={styles.lower} key="UserEnteredVariables">
                    <View>
                        <TextInput value={this.state.productName} onChangeText={
                            (value) => {
                                this.setState({ productName: value });
                            }
                        } />
                    </View>
                </View>

                <View>
                    <TouchableOpacity
                        disabled={this.state.productName.length == 0}
                        style={styles.navigationButton}
                        onPress={
                            () => {
                                this.state.prodSrv.AddProductToStorage({
                                    barcode: this.state.barcodeValue,
                                    barcodeType: this.state.barcodeType,
                                    productName: this.state.productName
                                } as IProduct).then(() => {
                                    this.props.navigation.navigate("Home");
                                });
                            }
                        }
                    >
                        <View style={styles.navigationButtonInner}>
                            <Text style={styles.navigationButtonText}>Add product</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    } as ViewStyle,
    upper: {
        flexDirection: "row",
        height: 20,
        alignItems: "center",
        justifyContent: "space-around"
    } as ViewStyle,
    lower: {

    } as ViewStyle,
    navigationButton: {
        backgroundColor: "#FFF",
        marginVertical: 15,
        borderWidth: 2,
        borderColor: "#CCC"
    } as ViewStyle,
    navigationButtonInner: {
        padding: 30
    } as ViewStyle,
    navigationButtonText: {
        fontSize: 20
    } as TextStyle
});
