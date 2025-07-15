
import React from 'react';
import { Trash2, DollarSign, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '../services/productService';
import { useProducts } from '@/contexts/ProductsContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
}) => {
  const { deleteProduct, toggleProductSelection } = useProducts();
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on checkbox or delete button
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('[role="checkbox"]')) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteProduct(product.id);
  };

  const handleToggleSelect = () => {
    toggleProductSelection(product.id);
  };

  return (
    <Card 
      className={`group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border-0 ${
        isSelected 
          ? 'ring-2 ring-blue-500 shadow-xl bg-blue-50/50' 
          : 'shadow-lg hover:shadow-2xl bg-white'
      }`}
      onClick={handleCardClick}
    >
      <CardContent className="p-6 space-y-4">
        {/* Header with selection and delete */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleToggleSelect}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          
          <Button
            onClick={handleDelete}
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Name */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 bg-green-100 rounded-md">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Description
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {product.description}
          </p>
        </div>

        {/* Product ID */}
        <div className="pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            ID: {product.id}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
