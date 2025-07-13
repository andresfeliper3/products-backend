import { Request, Response } from 'express';
import { Product } from '../models/product.model';


export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error retrieving products' });
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
