import { Router } from 'express';
import { getAllProducts, createProduct, deleteProduct } from '../controllers/product.controller';

const router = Router();

router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);

export default router;
