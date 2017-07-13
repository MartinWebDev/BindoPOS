import { SQLiteStorageConfig } from './StorageConfig';

import { SQLiteWrapper } from './SQLiteWrapper';

export class BindoPosData {
    // Property to store the SQLite wrapper
    db: SQLiteWrapper;

    constructor() {
        this.db = new SQLiteWrapper();

        //this.db.openDatabase(SQLiteStorageConfig.DatabaseName, SQLiteStorageConfig.DatabaseLocation);
    }
}