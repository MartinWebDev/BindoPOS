import { AsyncStorage } from 'react-native';

import { LocalStorageConfig } from './StorageConfig';

export class LocalStorageWrapper {
    static async GetValue(key: string) {
        return AsyncStorage.getItem
    }
}
