
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResultsView from '@/components/ResultsView';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we have a search query or came from a previous page
  useEffect(() => {
    const hasQuery = new URLSearchParams(location.search).has('q');
    const hasReferrer = document.referrer.includes(window.location.origin);
    
    // If no query and no referrer, redirect to home
    if (!hasQuery && !hasReferrer) {
      navigate('/');
    }
  }, [location, navigate]);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="container max-w-3xl">
          <div className="mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Analysis Results</h1>
            <div className="flex mt-4 space-x-2">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-1"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                Back to Home
              </button>
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-200">
            <ResultsView />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
