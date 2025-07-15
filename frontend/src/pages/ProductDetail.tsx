
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Package, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProducts } from '@/contexts/ProductsContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Producto no encontrado</h2>
            <p className="text-gray-600 mb-6">El producto que busca no se encuentra registrado.</p>
            <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a productos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = async () => {
    await deleteProduct(product.id);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-4 hover:bg-white/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a productos
        </Button>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Package className="h-8 w-8" />
                Detalles del producto
              </CardTitle>
              <Button
                onClick={handleDelete}
                variant="destructive"
                size="sm"
                className="bg-red-500 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar producto
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">ID:</span>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {product.id}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Precio
              </h2>
              <div className="text-4xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Descripción</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
