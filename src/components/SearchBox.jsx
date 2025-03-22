
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast.error('Please enter an ingredient to search');
      return;
    }
    
    setIsSearching(true);
    
    try {
      // In a real app, this would search for the ingredient
      // For the demo, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to results page with search term
      navigate(`/results?q=${encodeURIComponent(searchTerm)}`);
      toast.success(`Found results for "${searchTerm}"`);
    } catch (error) {
      toast.error('Search failed. Please try again.');
      console.error('Error searching:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto animate-fade-in">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search for an ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn(
            "w-full pl-12 pr-4 py-3 text-base rounded-xl border border-border focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none transition-all",
            "placeholder:text-muted-foreground/70 bg-background"
          )}
        />
        <div className="absolute left-4 flex items-center justify-center text-muted-foreground">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
        <button
          type="submit"
          disabled={isSearching || !searchTerm.trim()}
          className="absolute right-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 transition-all"
        >
          {isSearching ? (
            <span className="flex items-center">
              <svg 
                className="w-3 h-3 mr-1 animate-spin" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching
            </span>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
