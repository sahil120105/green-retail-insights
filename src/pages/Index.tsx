
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import MetricsOverview from '@/components/MetricsOverview';
import DashboardTabs from '@/components/DashboardTabs';
import { useSuppliers, useSupplierProducts } from '@/hooks/useSupabaseData';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: suppliers, isLoading: suppliersLoading } = useSuppliers();
  const { data: supplierProducts } = useSupplierProducts();

  // Group products by supplier for the SupplierCard component
  const getSupplierWithProducts = (supplier: any) => {
    const products = supplierProducts?.filter(sp => sp.supplier_id === supplier.id) || [];
    return {
      ...supplier,
      products: products.map(sp => ({
        name: sp.products.name,
        category: sp.products.category,
        co2PerUnit: sp.co2_per_unit,
        energyPerUnit: sp.energy_per_unit,
        waterPerUnit: sp.water_per_unit,
        environmentalScore: sp.environmental_score
      }))
    };
  };

  const filteredSuppliers = suppliers?.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <DashboardHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MetricsOverview />
        
        <DashboardTabs 
          suppliersLoading={suppliersLoading}
          filteredSuppliers={filteredSuppliers}
          getSupplierWithProducts={getSupplierWithProducts}
        />
      </main>
    </div>
  );
};

export default Index;
