
import React from 'react';
import { Trash2, Package, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/contexts/ProductsContext';

const ProductsList = () => {
  const {
    filteredProducts,
    loading,
    selectedProducts,
    searchTerm,
    priceRange,
    setSearchTerm,
    setPriceRange,
    bulkDeleteProducts,
    toggleSelectAll,
  } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Search className="h-6 w-6" />
              Búsqueda de productos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-semibold text-gray-700">
                  Buscar productos
                </Label>
                <Input
                  id="search"
                  placeholder="Buscar por nombre o descripción"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:border-blue-500 focus:ring-blue-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minPrice" className="text-sm font-semibold text-gray-700">
                  Precio mínimo ($)
                </Label>
                <Input
                  id="minPrice"
                  type="text"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })}
                  className="focus:border-blue-500 focus:ring-blue-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPrice" className="text-sm font-semibold text-gray-700">
                 Precio máximo ($)
                </Label>
                <Input
                  id="maxPrice"
                  type="text"
                  placeholder="1000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) || 1 })}
                  className="focus:border-blue-500 focus:ring-blue-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Package className="h-6 w-6" />
                Productos ({filteredProducts.length})
              </CardTitle>
              
              {filteredProducts.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all"
                      checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={toggleSelectAll}
                      className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
                    />
                    <label htmlFor="select-all" className="text-sm font-medium text-white cursor-pointer">
                      Seleccionar todo
                    </label>
                  </div>
                  
                  {selectedProducts.size > 0 && (
                    <Button
                      onClick={bulkDeleteProducts}
                      variant="destructive"
                      size="sm"
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Borrar selección ({selectedProducts.size})
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Package className="h-10 w-10 text-gray-f400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron productos</h3>
                <p className="text-gray-500">
                  {searchTerm || priceRange.min > 0 || priceRange.max < 1000 
                    ? 'Intenta ajustar la búsqueda o los filtros' 
                    : 'Añade tu primer producto.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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

export default ProductsList;
