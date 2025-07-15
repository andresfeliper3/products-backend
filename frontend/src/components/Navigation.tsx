
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Products', icon: ShoppingCart },
    { path: '/add-product', label: 'Add Product', icon: Plus },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Package className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold">Products Manager</h1>
          </div>
          
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                asChild
                variant="ghost"
                className={`text-white hover:bg-white/20 ${
                  location.pathname === item.path ? 'bg-white/20' : ''
                }`}
              >
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
