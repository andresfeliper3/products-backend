
import React from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm from '@/components/ProductForm';
import { useProducts } from '@/contexts/ProductsContext';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/services/productService';

const AddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    await addProduct(productData);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mt-1 mb-3">
      <Plus className="h-8 w-8 text-white" />
    </div>
        <h1 className="inline-block text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-5">
      Agregar nuevo producto
    </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Llena los detalles del producto para agregarlo a tu catálogo. Asegúrate de que toda la información sea correcta antes de guardar.
      </p>
    </div>

        {/* Add Product Form */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Plus className="h-6 w-6" />
              Detalles del producto
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ProductForm onSubmit={handleAddProduct} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
