
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import ScanProduct from './pages/ScanProduct';
import Search from './pages/Search';
import Product from './pages/Product';
import './App.css';
import Navbar from './components/Navbar';

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/scan';
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="App flex flex-col min-h-screen bg-background">
      {showNavbar && <Navbar />}
      <div className="main-content flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scan" element={<ScanProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search onProductSelect={setSelectedProduct} />} />
          <Route path="/product" element={<Product product={selectedProduct} />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="bottom-right" closeButton />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
