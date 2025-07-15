
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./contexts/ProductsContext";
import Navigation from "./components/Navigation";
import ProductsList from "./pages/ProductsList";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ProductsProvider>
          <div className="min-h-screen">
            <Navigation />
            <Routes>
              <Route path="/" element={<ProductsList />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ProductsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
