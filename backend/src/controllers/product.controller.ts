import { Request, Response } from 'express';
import { Product } from '../models/product.model';


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * limit;

    const { rows: products, count: total } = await Product.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    const hasMore = offset + products.length < total;

    res.status(200).json({ products, hasMore });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;

  if (!name || !description || price === undefined) {
    return res.status(400).json({ message: 'All fields are required: name, description, price' });
  }

  if (isNaN(price)) {
    return res.status(400).json({ message: 'Price must be a number' });
  }

  try {
    const product = await Product.create({ name, description, price });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await Product.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};
