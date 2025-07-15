
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
  hasMore: boolean;
  setPage: (page: number) => void;
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const { toast } = useToast();

  const loadProducts = async () => {
  try {
    setLoading(true);
    const { products: newProducts, hasMore: more } = await productService.getProducts(page, 10);

    if (newProducts.length === 0) {
      setHasMore(false);
    } else {
      setProducts(prev => [...prev, ...newProducts]);
      setHasMore(more);
      setPage(prev => prev + 1);
    }
  } catch (error) {
    console.error('Error loading products:', error);
    toast({
      title: "Error",
      description: "Error al cargar los productos. Por favor, inténtalo de nuevo.",
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
        title: "Proceso exitoso",
        description: "Producto agregado exitosamente!",
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Error al añadir el producto. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      await productService.deleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
      setSelectedProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
      toast({
        title: "Proceso exitoso",
        description: "Producto eliminado exitosamente!",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Error al eliminar el producto. Intente nuevamente.",
        variant: "destructive",
      });
    }
  };

  const bulkDeleteProducts = async () => {
    if (selectedProducts.size === 0) return;
    
    try {
      await Promise.all(
        Array.from(selectedProducts).map(id => productService.deleteProduct(id))
      );
      setProducts(prev => prev.filter(p => !selectedProducts.has(p.id)));
      setSelectedProducts(new Set());
      toast({
        title: "Success",
        description: `${selectedProducts.size} product(s) deleted successfully!`,
      });
    } catch (error) {
      console.error('Error deleting products:', error);
      toast({
        title: "Error",
        description: "Error al eliminar los productos. Intente nuevamente.",
        variant: "destructive",
      });
    }
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesSearch && matchesPrice;
  });

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        selectedProducts,
        searchTerm,
        priceRange,
        hasMore,
        setPage,
        setSearchTerm,
        setPriceRange,
        loadProducts,
        addProduct,
        deleteProduct,
        bulkDeleteProducts,
        toggleProductSelection,
        toggleSelectAll,
        filteredProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
