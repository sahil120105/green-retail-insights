
import React from 'react';
import { useSupplierProducts } from '@/hooks/useSupabaseData';
import ProductComparisonCard from './ProductComparisonCard';

const ProductComparisonPanel = () => {
  const { data: supplierProducts, isLoading, error } = useSupplierProducts();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'clothes': return 'bg-purple-100 text-purple-700';
      case 'food': return 'bg-orange-100 text-orange-700';
      case 'supplies': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error || !supplierProducts) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Error loading products</div>
      </div>
    );
  }

  // Group products by product name for comparison
  const productGroups = supplierProducts.reduce((groups: any, sp) => {
    const productName = sp.products.name;
    if (!groups[productName]) {
      groups[productName] = {
        productName,
        category: sp.products.category,
        suppliers: []
      };
    }
    groups[productName].suppliers.push({
      name: sp.suppliers.name,
      co2PerUnit: sp.co2_per_unit,
      energyPerUnit: sp.energy_per_unit,
      waterPerUnit: sp.water_per_unit,
      environmentalScore: sp.environmental_score,
      price: sp.price,
      supplierProduct: sp,
      isRecommended: sp.environmental_score >= 85
    });
    return groups;
  }, {});

  const productComparisons = Object.values(productGroups).filter((group: any) => group.suppliers.length > 1);

  return (
    <div className="space-y-6">
      {productComparisons.map((comparison: any, index) => (
        <ProductComparisonCard
          key={index}
          comparison={comparison}
          getCategoryColor={getCategoryColor}
          getScoreColor={getScoreColor}
        />
      ))}
    </div>
  );
};

export default ProductComparisonPanel;
