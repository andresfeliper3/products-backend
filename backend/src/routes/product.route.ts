import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, deleteProduct } from '../controllers/product.controller';

const router = Router();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer, example: 1 }
 *                   name: { type: string, example: Paracetamol }
 *                   description: { type: string, example: Analgésico }
 *                   price: { type: number, example: 8.99 }
 */
router.get('/', getAllProducts);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, example: 1 }
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer, example: 1 }
 *                 name: { type: string, example: Paracetamol }
 *                 description: { type: string, example: Analgésico }
 *                 price: { type: number, example: 8.99 }
 *       404:
 *         description: Product not found
 */
router.get('/:id', getProductById);

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
router.post('/', createProduct);


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
router.delete('/:id', deleteProduct);

export default router;
