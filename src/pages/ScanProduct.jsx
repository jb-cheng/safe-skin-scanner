
import React from 'react';
import ImageUploader from '@/components/ImageUploader';

const ScanProduct = () => {
  return (
    <div className="container max-w-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Scan Product</h1>
      <ImageUploader fullPage={true} />
    </div>
  );
};

export default ScanProduct;
