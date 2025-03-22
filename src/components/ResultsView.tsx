
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IngredientCard from './IngredientCard';
import { mockIngredients, UserProfile, Ingredient } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface ResultsViewProps {
  searchTerm?: string;
}

export function ResultsView({ searchTerm }: ResultsViewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const location = useLocation();
  
  // Parse search query from URL if not provided as prop
  const query = searchTerm || new URLSearchParams(location.search).get('q') || '';
  
  useEffect(() => {
    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error parsing profile:', error);
      }
    }
    
    // Simulate API loading
    setIsLoading(true);
    
    // If query is provided, filter ingredients by name or aliases
    const fetchData = setTimeout(() => {
      let resultIngredients = [...mockIngredients];
      
      if (query) {
        resultIngredients = mockIngredients.filter(ing => 
          ing.ingredient_name.toLowerCase().includes(query.toLowerCase()) ||
          ing.other_names.some(name => name.toLowerCase().includes(query.toLowerCase()))
        );
      }
      
      setIngredients(resultIngredients);
      setIsLoading(false);
      
      // Check for allergies and medical conditions
      if (userProfile) {
        const allergyWarnings = [];
        
        for (const ingredient of resultIngredients) {
          // Check if ingredient name or aliases match any allergies
          const matchingAllergies = userProfile.allergies.filter(allergy => 
            ingredient.ingredient_name.toLowerCase().includes(allergy.toLowerCase()) ||
            ingredient.other_names.some(name => name.toLowerCase().includes(allergy.toLowerCase()))
          );
          
          if (matchingAllergies.length > 0) {
            allergyWarnings.push(`"${ingredient.ingredient_name}" may trigger your allergy to ${matchingAllergies.join(', ')}`);
          }
          
          // Check if any medical conditions are in the concerns list
          const matchingConditions = userProfile.medical_conditions.filter(condition =>
            ingredient.concerns.some(concern => concern.toLowerCase().includes(condition.toLowerCase()))
          );
          
          if (matchingConditions.length > 0) {
            allergyWarnings.push(`"${ingredient.ingredient_name}" may be a concern for your ${matchingConditions.join(', ')} condition`);
          }
        }
        
        setWarnings(allergyWarnings);
      }
    }, 1500);
    
    return () => clearTimeout(fetchData);
  }, [query]);
  
  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-10 animate-fade-in">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary animate-spin"></div>
          <div className="absolute inset-3 rounded-full border-t-2 border-r-2 border-primary/70 animate-spin" style={{ animationDuration: '1s' }}></div>
          <div className="absolute inset-6 rounded-full border-t-2 border-r-2 border-primary/40 animate-spin" style={{ animationDuration: '1.5s' }}></div>
        </div>
        <div className="mt-6 text-lg font-medium text-foreground/80">Analyzing ingredients...</div>
      </div>
    );
  }
  
  if (ingredients.length === 0) {
    return (
      <div className="w-full text-center py-10 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50 text-muted-foreground mb-4">
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
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
        <h3 className="text-xl font-medium">No ingredients found</h3>
        <p className="text-muted-foreground mt-2">
          {query 
            ? `We couldn't find any ingredients matching "${query}"`
            : "Try uploading an image or searching for specific ingredients"
          }
        </p>
      </div>
    );
  }
  
  return (
    <div className="w-full animate-fade-in">
      {/* Personal warnings based on profile */}
      {warnings.length > 0 && (
        <div className="mb-8 p-4 rounded-xl bg-warning/10 border border-warning/20 animate-scale-in">
          <h3 className="text-lg font-medium flex items-center gap-2 text-warning">
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
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" x2="12" y1="9" y2="13"></line>
              <line x1="12" x2="12.01" y1="17" y2="17"></line>
            </svg>
            Personalized Warnings
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-foreground/90">
            {warnings.map((warning, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-warning">•</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Ingredient summary */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-medium">Ingredients Analysis</h2>
          <div className="text-sm text-muted-foreground">
            {ingredients.length} {ingredients.length === 1 ? 'ingredient' : 'ingredients'} found
          </div>
        </div>
        <div className="h-1 w-full bg-secondary/70 rounded-full overflow-hidden">
          <div className="flex h-full rounded-full overflow-hidden">
            {/* Calculate percentages of each safety level */}
            {(() => {
              const safe = ingredients.filter(i => i.safe === 'safe').length;
              const caution = ingredients.filter(i => i.safe === 'caution').length;
              const beware = ingredients.filter(i => i.safe === 'beware').length;
              
              const safePercent = (safe / ingredients.length) * 100;
              const cautionPercent = (caution / ingredients.length) * 100;
              const bewarePercent = (beware / ingredients.length) * 100;
              
              return (
                <>
                  <div className="bg-safe h-full transition-all duration-500" style={{ width: `${safePercent}%` }}></div>
                  <div className="bg-caution h-full transition-all duration-500" style={{ width: `${cautionPercent}%` }}></div>
                  <div className="bg-warning h-full transition-all duration-500" style={{ width: `${bewarePercent}%` }}></div>
                </>
              );
            })()}
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-safe"></span>
            <span>Safe ({ingredients.filter(i => i.safe === 'safe').length})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-caution"></span>
            <span>Caution ({ingredients.filter(i => i.safe === 'caution').length})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-warning"></span>
            <span>Beware ({ingredients.filter(i => i.safe === 'beware').length})</span>
          </div>
        </div>
      </div>
      
      {/* Ingredient cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {ingredients.map((ingredient, index) => (
          <IngredientCard 
            key={`${ingredient.ingredient_name}-${index}`} 
            ingredient={ingredient} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
}

export default ResultsView;
