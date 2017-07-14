// Import react stuff
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
    ListView,
    ListViewDataSource
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Import data and services
import { ProductService } from './Services/ProductService';

import { IProduct } from './ClientData/IProduct';

interface IProps {
    navigation: NavigationScreenProp<any, any>
}

interface IState {
    prodSrv: ProductService;
    products: IProduct[];
}

export class ScannedProductsScreen extends Component<IProps, IState> {
    static navigationOptions = ({ navigation, screenProps }: any) => {
        return {
            title: "Scanned Products"
        };
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            prodSrv: new ProductService(),
            products: []
        };
    }

    componentDidMount() {
        this.state.prodSrv.GetAllScannedProducts().then((products) => {
            this.setState({ products: products });
        });
    }

    renderProductListEntry(row: IProduct): JSX.Element {
        return (
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>{row.barcodeType}</Text>
                <Text>{row.barcode}</Text>
                <Text>{row.productName}</Text>
            </View>
        );
    }

    render(): JSX.Element {
        var productDS = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={productDS.cloneWithRows(this.state.products)}
                    renderRow={this.renderProductListEntry}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    } as ViewStyle
});
