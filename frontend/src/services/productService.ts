
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

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

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
  // Get all products
  async getProducts(): Promise<Product[]> {
    try {
      // Using JSONPlaceholder as a mock API for demonstration
      // In real implementation, replace with your actual API endpoint
      const response = await api.get('/products');
      console.log('Products fetched successfully:', response.data);
      // Transform the mock data to match our Product interface
      const products: Product[] = response.data.slice(0, 10).map((item: any, index: number) => ({
        id: item.id,
        name: item.name,
        description: item.description.substring(0, 100) + '...',
        price: parseFloat(item.price)
      }));
      
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },

  // Create a new product
  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      // Validate input data
      if (!product.name || !product.description || product.price <= 0) {
        throw new Error('Invalid product data');
      }

      // In a real API, this would create the product on the server
      // For demo purposes, we'll simulate the creation
      const response = await api.post('/posts', {
        title: product.name,
        body: product.description,
        userId: 1,
      });

      const newProduct: Product = {
        id: response.data.id || Date.now(), // Fallback to timestamp for unique ID
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

      // In a real API, this would delete the product from the server
      await api.delete(`/posts/${productId}`);
      
      console.log(`Product ${productId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  },

  // Update a product (for future use)
  async updateProduct(productId: number, product: Partial<Product>): Promise<Product> {
    try {
      if (!productId || productId <= 0) {
        throw new Error('Invalid product ID');
      }

      const response = await api.put(`/posts/${productId}`, {
        title: product.name,
        body: product.description,
        userId: 1,
      });

      const updatedProduct: Product = {
        id: productId,
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
      };

      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  },
};
