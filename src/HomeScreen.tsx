// Import react stuff
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ViewStyle,
    TextStyle
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Import data and services
import { BindoPosData } from './Storage/BindoPosData';
import { ProductService } from './Services/ProductService';

import { IProduct } from './ClientData/IProduct';

interface IProps {
    navigation: NavigationScreenProp<any, any>
}

interface IState {
    db: BindoPosData;
    prodSrv: ProductService;
    itemsInMemory: number;
}

export class HomeScreen extends Component<IProps, IState> {
    static navigationOptions = ({ navigation, screenProps }: any) => {
        // This shows 2 ways to grab stuff from the navigation system such as parameters. 
        //const { state, setParams } = navigation;
        //const NAV_PARAM_VALUE = state.params.NAV_PARAM_VALUE;
        //const { NAV_PARAM_VALUE } = state.params;

        return {
            title: "Bindo POS"
        };
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            db: new BindoPosData(),
            prodSrv: new ProductService(),
            itemsInMemory: 0
        };
    }

    componentDidMount(): void {
        this.updateItemsInMemoryCount();
    }

    updateItemsInMemoryCount(): void {
        this.state.prodSrv.GetCountOfCurrentScannedProducts().then((result) => {
            this.setState({ itemsInMemory: result });
        });
    }

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.navigationButton} onPress={
                    () => {
                        this.props.navigation.navigate("Scanner");
                    }
                }>
                    <View style={styles.navigationButtonInner}>
                        <Text style={styles.navigationButtonText}>Scanner</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton} onPress={
                    () => {
                        // Adding 10 fake products. After that recalculate the count
                        var newProducts: IProduct[] = []

                        for (var i = 0; i < 10; i++) {
                            newProducts.push({
                                barcode: (999900 + (i + this.state.itemsInMemory)).toString(),
                                barcodeType: "TYPE_39",
                                productName: "New Product " + (i + this.state.itemsInMemory).toString()
                            });
                        }

                        console.warn(JSON.stringify(newProducts));

                        this.state.prodSrv.AddProductsToStorage(newProducts)
                            .then(this.updateItemsInMemoryCount.bind(this));
                    }
                }>
                    <View style={styles.navigationButtonInner}>
                        <Text style={styles.navigationButtonText}>Add 10 random products</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <Text>Items currently in memory: {this.state.itemsInMemory}</Text>
                </View>

                <TouchableOpacity style={styles.navigationButton} onPress={
                    () => {
                        this.state.prodSrv.RemoveAllScannedProducts()
                            .then(this.updateItemsInMemoryCount.bind(this));
                    }
                }>
                    <View style={styles.navigationButtonInner}>
                        <Text style={styles.navigationButtonText}>Remove all products</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton} onPress={
                    () => {
                        alert("View scanned");
                    }
                }>
                    <View style={styles.navigationButtonInner}>
                        <Text style={styles.navigationButtonText}>View Scanned Products</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton} onPress={
                    () => {
                        alert("Save scanned to DB");
                    }
                }>
                    <View style={styles.navigationButtonInner}>
                        <Text style={styles.navigationButtonText}>Save scanned to database</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    } as ViewStyle,
    navigationButton: {
        backgroundColor: "#FFF",
        marginVertical: 10,
        borderWidth: 2,
        borderColor: "#CCC"
    } as ViewStyle,
    navigationButtonInner: {
        padding: 20
    } as ViewStyle,
    navigationButtonText: {
        fontSize: 15
    } as TextStyle
});
