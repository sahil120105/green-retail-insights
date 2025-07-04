
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BarChart3, Package, ShoppingCart, TrendingDown, Leaf } from 'lucide-react';
import SuppliersList from './SuppliersList';
import ProductComparisonPanel from './ProductComparisonPanel';
import OrdersPanel from './OrdersPanel';
import CarbonChart from './CarbonChart';
import RecommendationsPanel from './RecommendationsPanel';
import CarbonSavingsPanel from './CarbonSavingsPanel';

interface DashboardTabsProps {
  suppliersLoading: boolean;
  filteredSuppliers: any[];
  getSupplierWithProducts: (supplier: any) => any;
}

const DashboardTabs = ({ suppliersLoading, filteredSuppliers, getSupplierWithProducts }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="suppliers" className="mt-8">
      <TabsList className="grid w-full grid-cols-6 mb-8">
        <TabsTrigger value="suppliers" className="flex items-center space-x-2">
          <Award className="h-4 w-4" />
          <span>Suppliers</span>
        </TabsTrigger>
        <TabsTrigger value="products" className="flex items-center space-x-2">
          <Package className="h-4 w-4" />
          <span>Products</span>
        </TabsTrigger>
        <TabsTrigger value="orders" className="flex items-center space-x-2">
          <ShoppingCart className="h-4 w-4" />
          <span>Orders</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center space-x-2">
          <BarChart3 className="h-4 w-4" />
          <span>Analytics</span>
        </TabsTrigger>
        <TabsTrigger value="recommendations" className="flex items-center space-x-2">
          <TrendingDown className="h-4 w-4" />
          <span>Recommendations</span>
        </TabsTrigger>
        <TabsTrigger value="savings" className="flex items-center space-x-2">
          <Leaf className="h-4 w-4" />
          <span>Carbon Savings</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="suppliers">
        <SuppliersList 
          suppliersLoading={suppliersLoading}
          filteredSuppliers={filteredSuppliers}
          getSupplierWithProducts={getSupplierWithProducts}
        />
      </TabsContent>

      <TabsContent value="products">
        <ProductComparisonPanel />
      </TabsContent>

      <TabsContent value="orders">
        <OrdersPanel />
      </TabsContent>

      <TabsContent value="analytics">
        <CarbonChart />
      </TabsContent>

      <TabsContent value="recommendations">
        <RecommendationsPanel />
      </TabsContent>

      <TabsContent value="savings">
        <CarbonSavingsPanel />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
