// Import react stuff
import {
    StackNavigator,
    NavigationContainer,
    NavigationScreenOptions
} from 'react-navigation';

// Import tabs
import { HomeScreen } from './HomeScreen';
import { ScannerScreen } from './ScannerScreen';
import { AddProductScreen } from './Scanner/AddProductScreen';

export const App: NavigationContainer = StackNavigator(
    {
        Home: { screen: HomeScreen },
        Scanner: { screen: ScannerScreen },
        AddProduct: { screen: AddProductScreen }
    }
);