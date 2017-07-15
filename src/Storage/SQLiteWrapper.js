/**
 * This file was done as a javascript file rather than typescript as no
 * typescript definition file could be found for thie plugin.
 * I had begun work on writing my own, but the time taken to do so was too great for just a simple demo.
 * Instead a javascript file is being used so that a d.ts file is not required.
 * This is not my ideal situation in a real app, and I would rather finish my definition file,
 * but for saving time it will be sufficient for now. 
 */

import SQLite from 'react-native-sqlite-storage';

export class SQLiteWrapper {
    db; // Store the database connection locally

    constructor() {
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
    }

    async openDatabase(dbName, dbLocation) {
        return await SQLite.openDatabase({ name: dbName, createFromLocation: dbLocation }).then((db) => {
            this.db = db;
        });
    }

    async query(qs) {
        return await this.db.executeSql(qs).then(([tx, results]) => {
            return tx;
        });
    }

    async closeDatabase() {
        return await this.db.close();
    }
}