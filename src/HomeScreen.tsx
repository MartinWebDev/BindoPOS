// Import react stuff
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Import data and services
import { BindoPosData } from './Storage/BindoPosData';

interface IProps {
    navigation: NavigationScreenProp<any, any>
}

interface IState {
    db: BindoPosData;
}

export class HomeScreen extends Component<IProps, IState> {
    static navigationOptions = ({ navigation, screenProps }: any) => {
        // This shows 2 ways to grab stuff from the navigation system such as parameters. 
        //const { state, setParams } = navigation;
        //const NAV_PARAM_VALUE = state.params.NAV_PARAM_VALUE;
        //const { NAV_PARAM_VALUE } = state.params;

        return {
            title: "Product Scanner"
        };
    };

    constructor(props: IProps) {
        super(props);

        this.state = { db: new BindoPosData() };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>

                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>

                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
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
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
