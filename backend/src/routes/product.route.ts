import { Router } from 'express';
import { getAllProducts, createProduct, deleteProduct } from '../controllers/product.controller';

const router = Router();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/products', getAllProducts);


/**
 * @openapi
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       description: Product object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *             required:
 *               - name
 *               - description
 *               - price
 *     responses:
 *       201:
 *         description: Product created
 */
router.post('/products', createProduct);


/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete('/products/:id', deleteProduct);

export default router;
