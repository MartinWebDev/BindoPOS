import React, { Component } from 'react';

import {
  AppRegistry
} from 'react-native';

import { App } from './build/App';

// Ignore certain warnings that annoy me
console.ignoredYellowBox = ['Warning: View.propTypes', 'Warning: BackAndroid', 'Remote debugger'];

const AppBootstrap = () => <App />;

AppRegistry.registerComponent('BindoPosTest', () => AppBootstrap);
