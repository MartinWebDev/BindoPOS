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
import { ScannedProductsScreen } from './ScannedProductsScreen';
import { SearchDatabaseScreen } from './SearchDatabaseScreen';

export const App: NavigationContainer = StackNavigator(
    {
        Home: { screen: HomeScreen },
        Scanner: { screen: ScannerScreen },
        AddProduct: { screen: AddProductScreen },
        ViewScannedProducts: { screen: ScannedProductsScreen },
        SearchDatabase: { screen: SearchDatabaseScreen }
    }
);