
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import ResultsView from '@/components/ResultsView';

const Product = ({ product }) => {
  const navigate = useNavigate();
  
  // Redirect to search if no product is selected
  if (!product) {
    navigate('/search');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="container max-w-5xl">
          <div className="mb-10 text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{product.name || 'Product Details'}</h1>
            <p className="mt-3 text-muted-foreground">
              Detailed information about this product and its ingredients
            </p>
          </div>
          
          <div className="p-6 md:p-8 rounded-2xl border border-border backdrop-blur-sm glass-light">
            <ResultsView ingredients={product.ingredients || []} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Product;
