
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Ingredient } from '@/utils/mockData';

interface IngredientCardProps {
  ingredient: Ingredient;
  index: number;
}

export function IngredientCard({ ingredient, index }: IngredientCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const getSafetyBadge = (safety: Ingredient['safe']) => {
    switch (safety) {
      case 'safe':
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-safe/10 text-safe w-fit">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            <span className="text-xs font-medium">Safe</span>
          </div>
        );
      case 'caution':
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-caution/10 text-caution w-fit">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
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
            <span className="text-xs font-medium">Caution</span>
          </div>
        );
      case 'beware':
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning/10 text-warning w-fit">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
            <span className="text-xs font-medium">Beware</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      className={cn(
        "group relative rounded-2xl overflow-hidden transition-all p-px",
        "animate-fade-in animate-delay-100"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/40 to-muted/20 rounded-2xl"></div>
      <div className="relative rounded-2xl overflow-hidden bg-card border-border/40 border backdrop-blur-xs glass-light">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold">{ingredient.ingredient_name}</h3>
              <div className="text-muted-foreground text-sm mt-1">{ingredient.usage}</div>
            </div>
            {getSafetyBadge(ingredient.safe)}
          </div>
          
          <div
            className={cn(
              "grid gap-4 transition-all duration-300",
              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="overflow-hidden min-h-0">
              <div className="grid gap-4 pt-4 border-t border-border/30">
                {/* Background */}
                <div>
                  <h4 className="text-sm font-medium text-foreground/90 mb-1">Background</h4>
                  <p className="text-sm text-muted-foreground">{ingredient.background}</p>
                </div>
                
                {/* Also known as */}
                <div>
                  <h4 className="text-sm font-medium text-foreground/90 mb-1">Also Known As</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {ingredient.other_names.map((name, i) => (
                      <span 
                        key={i}
                        className="inline-block px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Side effects */}
                {ingredient.side_effects.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground/90 mb-1">Potential Side Effects</h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-0.5">
                      {ingredient.side_effects.map((effect, i) => (
                        <li key={i}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Concerns */}
                {ingredient.concerns.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground/90 mb-1">Concerns</h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-0.5">
                      {ingredient.concerns.map((concern, i) => (
                        <li key={i}>{concern}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full mt-4 text-sm text-primary hover:text-primary/90 font-medium transition-colors focus:outline-none"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default IngredientCard;
