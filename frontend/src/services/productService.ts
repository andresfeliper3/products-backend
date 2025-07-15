
import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const productService = {
    async getProducts(page = 1, limit = 10): Promise<{ products: Product[]; hasMore: boolean }> {
      try {
        const response = await api.get('/products', {
          params: { page, limit },
        });

        const products: Product[] = response.data.products.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: parseFloat(item.price),
        }));

        const hasMore: boolean = response.data.hasMore;

        return { products, hasMore };
      } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
      }
  }, 

  // Create a new product
  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      if (!product.name || !product.description || product.price <= 0) {
        throw new Error('Invalid product data');
      }

      const response = await api.post('/products', {
        name: product.name,
        description: product.description,
        price: product.price,
      });

      const newProduct: Product = {
        id: response.data.id || Date.now(),
        name: product.name,
        description: product.description,
        price: product.price,
      };

      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  },

  // Delete a product
  async deleteProduct(productId: number): Promise<void> {
    try {
      if (!productId || productId <= 0) {
        throw new Error('Invalid product ID');
      }
      await api.delete(`/products/${productId}`);
      
      console.log(`Producto ${productId} eliminado exitosamente`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  },
};
