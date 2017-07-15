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
    Button,
    ScrollView
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
    searchTerm: string;
    dbResults: IProduct[];
}

export class SearchDatabaseScreen extends Component<IProps, IState> {
    static navigationOptions = ({ navigation, screenProps }: any) => {
        return {
            title: "Search Database"
        };
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            prodSrv: new ProductService(),
            searchTerm: "",
            dbResults: []
        };
    }

    render(): JSX.Element {
        // This is to demo the alternative way to map an array to a "list" style view without actually using a listView and a dataSource
        let results = this.state.dbResults.map((item, index) => {
            return (
                <View
                    key={`Result_${index}`}
                    style={{ padding: 8, borderBottomColor: "#CCC", borderBottomWidth: 1 }}
                >
                    <Text>{item.barcode}</Text>
                    <Text>{item.barcodeType}</Text>
                    <Text>{item.productName}</Text>
                </View>
            );
        });

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>
                    <TextInput style={{ flex: 1 }} value={this.state.searchTerm} onChangeText={
                        (value) => {
                            this.setState({ searchTerm: value });
                        }
                    } />

                    <Button title="Search" onPress={
                        () => {
                            this.state.prodSrv.SearchDatabase(this.state.searchTerm).then((result) => {
                                //console.log(result);
                                this.setState({ dbResults: result });
                            });
                        }
                    } />
                </View>

                <ScrollView>
                    {
                        this.state.dbResults.length > 0 ?
                            results :
                            (<View><Text>No results found!</Text></View>)
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
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
