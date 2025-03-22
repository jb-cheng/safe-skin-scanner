
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import SearchBox from '@/components/SearchBox';
import { cn } from '@/lib/utils';
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import ScanProduct from "./pages/ScanProduct";
import Search from "./pages/Search";
import Product from "./pages/Product";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/scan';
  const [activeTab, setActiveTab] = useState('scan');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {showHeader && <Header />}
      
      <main className="flex-1 pt-28 pb-16 px-4">
        <Routes>
          <Route path="/" element={
            <div className="container max-w-5xl">
              {/* Hero Section */}
              <div className="text-center mb-12 space-y-4 animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                  Understand what's in your
                  <span className="text-primary"> products</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Upload images of ingredient lists or search for specific ingredients to get detailed information and personalized safety analysis.
                </p>
              </div>
              
              {/* Tab Navigation */}
              <div className="max-w-md mx-auto mb-8 animate-fade-in animate-delay-200">
                <div className="flex rounded-xl p-1 bg-secondary/50 backdrop-blur-xs">
                  <button
                    onClick={() => setActiveTab('scan')}
                    className={cn(
                      "flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all",
                      activeTab === 'scan'
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-foreground/70 hover:text-foreground hover:bg-secondary/80"
                    )}
                  >
                    Scan Image
                  </button>
                  <button
                    onClick={() => setActiveTab('search')}
                    className={cn(
                      "flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all",
                      activeTab === 'search'
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-foreground/70 hover:text-foreground hover:bg-secondary/80"
                    )}
                  >
                    Search Ingredient
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="max-w-md mx-auto animate-fade-in animate-delay-300">
                {activeTab === 'scan' ? (
                  <ImageUploader />
                ) : (
                  <SearchBox />
                )}
              </div>
              
              {/* Features Section */}
              <div className="mt-24 grid gap-8 md:grid-cols-3">
                <div className="p-6 rounded-2xl border border-border/40 backdrop-blur-xs glass-light animate-slide-up" style={{ animationDelay: '100ms' }}>
                  <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Detailed Information</h3>
                  <p className="text-muted-foreground">
                    Get comprehensive details about each ingredient including background, usage, and potential side effects.
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl border border-border/40 backdrop-blur-xs glass-light animate-slide-up" style={{ animationDelay: '200ms' }}>
                  <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Personalized Analysis</h3>
                  <p className="text-muted-foreground">
                    Set up your profile with allergies and medical conditions to get personalized safety warnings.
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl border border-border/40 backdrop-blur-xs glass-light animate-slide-up" style={{ animationDelay: '300ms' }}>
                  <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" x2="12" y1="9" y2="13"></line>
                      <line x1="12" x2="12.01" y1="17" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Safety Indicators</h3>
                  <p className="text-muted-foreground">
                    Clear safety indicators help you understand potential risks associated with each ingredient.
                  </p>
                </div>
              </div>
            </div>
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path="/results" element={<Results />} />
          <Route path="/scan" element={<ScanProduct />} />
          <Route path="/search" element={<Search onProductSelect={setSelectedProduct} />} />
          <Route path="/product" element={<Product product={selectedProduct} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {showHeader && <Footer />}
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
