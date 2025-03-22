
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Product = ({ product }) => {
  const navigate = useNavigate();
  
  if (!product) {
    navigate('/search');
    return null;
  }
  
  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{product?.name || 'Product Details'}</h1>
      
      <div className="bg-card rounded-lg shadow-md p-6 mb-6">
        {product ? (
          <>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Ingredients:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Safety Analysis:</h3>
              <div className="bg-secondary/50 p-4 rounded-md">
                <p>{product.analysis || 'No safety concerns identified.'}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6 mb-6" />
            <Skeleton className="h-32 w-full rounded-md" />
          </>
        )}
      </div>
      
      <Button onClick={() => navigate(-1)} variant="outline">
        Back to Search
      </Button>
    </div>
  );
};

export default Product;
