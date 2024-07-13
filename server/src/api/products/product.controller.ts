import {Request, Response, NextFunction} from 'express';
import { HttpStatusCode } from "@/shared/types/enums/httpcode.types";
import ProductService from './product.service';

import type { 
    getManyProductsParameters, 
    getOneProductParameters, 
    updateProductParameters,
    deleteProductParameters, 
    createProductBody,
    updateProductBody } from './product.types';

class ProductController {
    public static async getManyProducts(req: Request, res: Response, next: NextFunction) {
        const paramsProducts = req.body as getManyProductsParameters;
        const products = await ProductService.getManyProducts(paramsProducts);
        res.status(HttpStatusCode.OK).json({products: products});
    }
    public static async getOneProduct(req: Request, res: Response, next: NextFunction) {
        const paramsProduct = req.body as getOneProductParameters;
        const product = await ProductService.getOneProduct(paramsProduct);
        res.status(HttpStatusCode.OK).json({product: product});
    }
    public static async createProduct(req: Request, res: Response, next: NextFunction) {
        const newProduct = req.body as createProductBody;
        await ProductService.createProduct(newProduct);
        res.status(HttpStatusCode.CREATED).json({product: newProduct});
    }
    public static async updateProduct(req: Request, res: Response, next: NextFunction) {
        const paramsProducts = req.body as updateProductParameters;
        const updatedProductDetails = req.body as updateProductBody;
        await ProductService.updateProduct(updatedProductDetails, paramsProducts);
        res.status(HttpStatusCode.CREATED).json({product: updatedProductDetails});
    }
    public static async deleteProduct(req: Request, res: Response, next: NextFunction) {
        const paramsProduct = req.body as deleteProductParameters;
        await ProductService.deleteProduct(paramsProduct);
        res.status(HttpStatusCode.OK).json({message: 'Product deleted successfully'});
    }
}

export default ProductController;