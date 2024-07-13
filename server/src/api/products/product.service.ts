import ProductRepository from "@/api/products/product.repository";
import { HttpStatusCode } from "@/shared/types/enums/httpcode.types";
import AppError from "@/shared/exceptions/app-error";
import { Product } from "@/shared/models/entities";

import type {
    getManyProductsParameters,
    getOneProductParameters,
    updateProductParameters,
    deleteProductParameters
} from './product.types';

class ProductService {

    public static async getManyProducts(getProductsParams: getManyProductsParameters): Promise<Product[]> {
        const products = await ProductRepository.getProducts(getProductsParams);

        return products;
    }

    public static async getOneProduct(getProductParams : getOneProductParameters): Promise<Product> {
        const product = await ProductRepository.getProductById(getProductParams);

        if (!product) {
            throw new AppError('Product not found', HttpStatusCode.NOT_FOUND, 'getOneProduct');
        }

        return product;
    }
    public static async createProduct(product: Product): Promise<Product> {
        const result = await ProductRepository.addProduct(product);

        if (result.identifiers.length === 0) {
            throw new AppError('Could not create product', HttpStatusCode.INTERNAL_SERVER_ERROR, 'createProduct');
        }

        return product;
    }
    public static async updateProduct(updatedProductDetails: Partial<Product>, updatedProductParams : updateProductParameters): Promise<Partial<Product>> {
        const result = await ProductRepository.updateProductById(updatedProductDetails, updatedProductParams);

        if (result.affected === 0) {
            throw new AppError('Could not update product, product not found', HttpStatusCode.NOT_FOUND, 'updateProduct');
        }

        return updatedProductDetails;
    }
    public static async deleteProduct(deleteProductParams : deleteProductParameters): Promise<void> {
        const result = await ProductRepository.deleteProductById(deleteProductParams);

        if (result.affected === 0) {
            throw new AppError('Could not delete product, product not found', HttpStatusCode.NOT_FOUND, 'deleteProduct');
        }
    }
}

export default ProductService;