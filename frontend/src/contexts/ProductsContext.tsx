
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { productService, Product } from '../services/productService';
import { useToast } from '@/hooks/use-toast';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  selectedProducts: Set<number>;
  searchTerm: string;
  priceRange: { min: number; max: number };
  setSearchTerm: (term: string) => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  bulkDeleteProducts: () => Promise<void>;
  toggleProductSelection: (productId: number) => void;
  toggleSelectAll: () => void;
  filteredProducts: Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const { toast } = useToast();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "Success",
        description: "Product added successfully!",
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  };

  

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        selectedProducts,
        searchTerm,
        priceRange,
        setSearchTerm,
        setPriceRange,
        loadProducts,
        addProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
