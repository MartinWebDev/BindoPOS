// Import react stuff
import {
    StackNavigator,
    NavigationContainer,
    NavigationScreenOptions
} from 'react-navigation';

// Import tabs
import { HomeScreen } from './HomeScreen';
import { ScannerScreen } from './ScannerScreen';

export const App: NavigationContainer = StackNavigator(
    {
        Home: { screen: HomeScreen },
        Scanner: { screen: ScannerScreen }
    }
);