import { IProduct } from '../ClientData/IProduct';
import { LocalStorageWrapper } from '../Storage/LocalStorageWrapper';
import { LocalStorageConfig } from '../Storage/StorageConfig';

import { SQLiteStorageConfig } from '../Storage/StorageConfig';
import { SQLiteWrapper } from '../Storage/SQLiteWrapper';

export class ProductService {
    /**
     * Get the current count of the products in local storage.
     * This is the count of how many we have scanned, not how many in the database.
     */
    async GetCountOfCurrentScannedProducts(): Promise<number> {
        return await this.GetAllScannedProductsFromStorage().then((result) => {
            if (result == null)
                return 0;

            let resultObj = JSON.parse(result);

            return resultObj.length;
        });
    }

    /**
     * Quick method to just grab the string value of the stored products in local storage.
     */
    async GetAllScannedProductsFromStorage(): Promise<string> {
        return await LocalStorageWrapper.GetValue(LocalStorageConfig.ScannedBarcodes);
    }

    /**
     * Get the actual list of products parsed as an array of IProduct
     */
    async GetAllScannedProducts(): Promise<IProduct[]> {
        return await this.GetAllScannedProductsFromStorage().then((result) => {
            if (result == null)
                return [] as IProduct[];

            let resultObj = JSON.parse(result);

            return resultObj as IProduct[];
        });
    }

    /**
     * This function creates an array of a single item and sends it to the array version.
     * @param {IProduct} product A single product to add to the database
     */
    async AddProductToStorage(product: IProduct): Promise<void> {
        return await this.AddProductsToStorage([product]);
    }

    /**
     * Add products to the local storage
     * @param {IProduct[]} productsIn List of products to add as an array
     */
    async AddProductsToStorage(productsIn: IProduct[]): Promise<void> {
        return await LocalStorageWrapper.GetValue(LocalStorageConfig.ScannedBarcodes).then((result) => {
            let resultObj: any[];

            if (result == null) {
                resultObj = [];
            }
            else {
                resultObj = JSON.parse(result)
            }

            let products: IProduct[] = resultObj.map((item) => {
                return {
                    barcode: item.barcode,
                    barcodeType: item.barcodeType,
                    productName: item.productName
                } as IProduct;
            });

            for (var i = 0; i < productsIn.length; i++) {
                products.push({
                    barcode: productsIn[i].barcode,
                    barcodeType: productsIn[i].barcodeType,
                    productName: productsIn[i].productName
                } as IProduct);
            }

            LocalStorageWrapper.SetValue(LocalStorageConfig.ScannedBarcodes, products);
        });
    }

    async RemoveAllScannedProducts(): Promise<void> {
        return await LocalStorageWrapper.RemoveValue(LocalStorageConfig.ScannedBarcodes);
    }

    async SearchDatabase(searchTerm: string): Promise<IProduct[]> {
        let db = new SQLiteWrapper();

        /**
         * To make sure this all fires of in the correct order, the outer most open function is
         * returned as a promisable method, which in turn returns the query as a promise,
         * and then finally the finished results is returned which can then be read by the
         * "then" method of whatever calls this function. The entire thing is then "awaited" to make
         * sure nothing happens until all promises are fulfilled. 
         */
        return await db.openDatabase(SQLiteStorageConfig.DatabaseName, SQLiteStorageConfig.DatabaseLocation)
            .then(() => {
                // Once the database is open, create the SQL (just as messy text for now, XSS and script injection protection would be added later)
                return db.query(`SELECT * FROM Product WHERE Name LIKE '%${searchTerm}%' ORDER BY Name;`)
                    .then((tx: any) => {
                        // Once the query is completely, we inspect the transaction and compile the results into a usable array and return it
                        let results: IProduct[] = [];

                        for (var i = 0; i < tx.rows.length; i++) {
                            let current = tx.rows.item(i);

                            results.push({
                                barcode: current.Barcode,
                                barcodeType: current.BarCodeType,
                                productName: current.Name
                            } as IProduct);
                        }

                        // Good practice, dispose of used items
                        db.closeDatabase();

                        return results;
                    });
            });
    }

    async AddProductsToDatabase(products: IProduct[]): Promise<void> {
        let db = new SQLiteWrapper();

        // Build query to add all in one go. Maybe reindex after?
        let qs: string = "INSERT INTO Product (Name, Barcode, BarCodeType) VALUES ";
        let prodsString: string = "";

        products.forEach(p => {
            prodsString = prodsString + `('${p.productName}', '${p.barcode}', '${p.barcodeType}'),`;
        });

        // Remove trailing comma and add a ; to finish the string
        qs += prodsString.substr(0, prodsString.length - 1) + ";";

        debugger;

        return await db.openDatabase(SQLiteStorageConfig.DatabaseName, SQLiteStorageConfig.DatabaseLocation)
            .then(() => {
                return db.query(qs).then((tx: any) => {
                    debugger;
                    return; // Need to work out a better way to return an empty promise from SQLite. I'll work that out another time. 
                });
            });
    }
}
