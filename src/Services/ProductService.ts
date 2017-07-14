import { IProduct } from '../ClientData/IProduct';
import { LocalStorageWrapper } from '../Storage/LocalStorageWrapper';
import { LocalStorageConfig } from '../Storage/StorageConfig';

export class ProductService {
    async GetCountOfCurrentScannedProducts(): Promise<number> {
        return await this.GetAllScannedProductsFromStorage().then((result) => {
            if (result == null)
                return 0;

            let resultObj = JSON.parse(result);

            return resultObj.length;
        });
    }

    async GetAllScannedProductsFromStorage(): Promise<string> {
        return await LocalStorageWrapper.GetValue(LocalStorageConfig.ScannedBarcodes);
    }

    async GetAllScannedProducts(): Promise<IProduct[]> {
        return await this.GetAllScannedProductsFromStorage().then((result) => {
            if (result == null)
                return [] as IProduct[];

            let resultObj = JSON.parse(result);

            return resultObj as IProduct[];
        });
    }

    async AddProductToStorage(product: IProduct): Promise<void> {
        return await this.AddProductsToStorage([product]);
    }

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
}
