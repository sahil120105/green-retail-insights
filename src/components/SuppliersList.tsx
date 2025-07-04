
import React from 'react';
import SupplierCard from './SupplierCard';

interface SuppliersListProps {
  suppliersLoading: boolean;
  filteredSuppliers: any[];
  getSupplierWithProducts: (supplier: any) => any;
}

const SuppliersList = ({ suppliersLoading, filteredSuppliers, getSupplierWithProducts }: SuppliersListProps) => {
  if (suppliersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading suppliers...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSuppliers.map((supplier) => (
        <SupplierCard
          key={supplier.id}
          name={supplier.name}
          location={supplier.location}
          sustainabilityScore={supplier.sustainability_score}
          carbonFootprint={supplier.carbon_footprint}
          energyConsumption={supplier.energy_consumption}
          waterUsage={supplier.water_usage}
          certifications={supplier.certifications}
          products={getSupplierWithProducts(supplier).products}
          trend={supplier.trend}
        />
      ))}
    </div>
  );
};

export default SuppliersList;
