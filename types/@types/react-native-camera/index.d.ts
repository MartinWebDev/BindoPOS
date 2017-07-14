declare module "react-native-camera" {
    // Apparently these need importing inside the module declaration, not outside.
    import React, { Component } from 'react';

    interface IProps {
        style: any;
        aspect: any;
        barCodeTypes: string[];
        onBarCodeRead: any;
    }

    export default class Camera extends Component<IProps> {
        static constants: any;
    }
}
