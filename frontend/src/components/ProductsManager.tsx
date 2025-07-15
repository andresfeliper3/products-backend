
import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Package, ShoppingCart, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import ProductForm from './ProductForm';
import ProductCard from './ProductCard';
import { productService, Product } from '../services/productService';

const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

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

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
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

  const handleDeleteProduct = async (productId: number) => {
    try {
      await productService.deleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
      setSelectedProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) return;
    
    try {
      setDeleting(true);
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
        description: "Failed to delete some products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
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
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(products.map(p => p.id)));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Igloolab products
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your product catalog with ease. Add, view, and delete products with a beautiful, responsive interface.
          </p>
        </div>

        {/* Add Product Form */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Plus className="h-6 w-6" />
              Add New Product
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ProductForm onSubmit={handleAddProduct} />
          </CardContent>
        </Card>

        {/* Products List */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShoppingCart className="h-6 w-6" />
                Productos ({products.length})
              </CardTitle>
              
              {products.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all"
                      checked={selectedProducts.size === products.length && products.length > 0}
                      onCheckedChange={toggleSelectAll}
                      className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
                    />
                    <label htmlFor="select-all" className="text-sm font-medium text-white cursor-pointer">
                      Seleccionar todo
                    </label>
                  </div>
                  
                  {selectedProducts.size > 0 && (
                    <Button
                      onClick={handleBulkDelete}
                      disabled={deleting}
                      variant="destructive"
                      size="sm"
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected ({selectedProducts.size})
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Package className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Yet</h3>
                <p className="text-gray-500">Add your first product using the form above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProducts.has(product.id)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductsManager;
