import { Router } from 'express';
//import {
//    createProductSchema, // auth
//    updateProductSchema, // auth
//    deleteProductSchema, // auth
//    getOneProductSchema, // no auth
//    getManyProductsSchema, // no auth
//} from './product.validator';

const router = Router();

// all products routes
// get query params:
// - limit: number of products to return
// - offset: number of products to skip
// - sortBy: sort products by field
// - order: order of sorting (asc, desc)
// - categories: filter products by category (using array Category enum)
// - searchByTitle: search products by title
// - minPrice: filter products by minimum price
// - maxPrice: filter products by maximum price
// - minRating: filter products by minimum rating
// - inStock: filter products that are in stock
// - brand: fitler products by brand
// - dimension: filter products by dimension
router.get('/');
router.post('/');

// single product routes
router.get('/:product_id');
router.put('/:product_id');
router.delete('/:product_id');

export default router;
