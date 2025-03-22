
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from '@/components/SearchBox';

const Search = ({ onProductSelect }) => {
  const navigate = useNavigate();
  
  const handleProductSelect = (product) => {
    onProductSelect(product);
    navigate('/product');
  };
  
  return (
    <div className="container max-w-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Search Products</h1>
      <SearchBox onResultSelect={handleProductSelect} fullPage={true} />
    </div>
  );
};

export default Search;
