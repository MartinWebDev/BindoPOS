import { AsyncStorage } from 'react-native';

import { LocalStorageConfig } from './StorageConfig';

export class LocalStorageWrapper {
    static async GetValue(key: string): Promise<string> {
        let value = await AsyncStorage.getItem(key);

        return value;
    }

    static async SetValue(key: string, value: any): Promise<void> {
        let valueString = JSON.stringify(value);

        return await AsyncStorage.setItem(key, valueString);
    }

    static async RemoveValue(key: string): Promise<void> {
        return await AsyncStorage.removeItem(key);
    }
}
