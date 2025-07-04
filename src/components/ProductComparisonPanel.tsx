
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Leaf, Zap, Droplets, Award } from 'lucide-react';
import { useSupplierProducts } from '@/hooks/useSupabaseData';
import OrderProductModal from './OrderProductModal';

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
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{comparison.productName}</CardTitle>
                <CardDescription className="flex items-center space-x-2 mt-1">
                  <Badge className={`text-xs ${getCategoryColor(comparison.category)}`}>
                    {comparison.category}
                  </Badge>
                  <span>•</span>
                  <span>{comparison.suppliers.length} suppliers available</span>
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort by Impact
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Leaf className="h-3 w-3" />
                      <span>CO₂/unit</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Zap className="h-3 w-3" />
                      <span>Energy</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Droplets className="h-3 w-3" />
                      <span>Water</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Award className="h-3 w-3" />
                      <span>Score</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparison.suppliers
                  .sort((a: any, b: any) => b.environmentalScore - a.environmentalScore)
                  .map((supplier: any, supplierIndex: number) => (
                  <TableRow key={supplierIndex} className={supplier.isRecommended ? 'bg-green-50' : ''}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{supplier.name}</span>
                        {supplier.isRecommended && (
                          <Badge className="text-xs bg-green-100 text-green-700">
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={supplier.co2PerUnit <= 2.5 ? 'text-green-600 font-medium' : 'text-red-600'}>
                        {supplier.co2PerUnit}kg
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={supplier.energyPerUnit <= 16 ? 'text-green-600 font-medium' : 'text-red-600'}>
                        {supplier.energyPerUnit}kWh
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={supplier.waterPerUnit <= 200 ? 'text-green-600 font-medium' : 'text-red-600'}>
                        {supplier.waterPerUnit}L
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-semibold ${getScoreColor(supplier.environmentalScore)}`}>
                        {supplier.environmentalScore}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      ${supplier.price}
                    </TableCell>
                    <TableCell className="text-center">
                      <OrderProductModal supplierProduct={supplier.supplierProduct}>
                        <Button 
                          size="sm" 
                          variant={supplier.isRecommended ? "default" : "outline"}
                          className={supplier.isRecommended ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          Order Now
                        </Button>
                      </OrderProductModal>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductComparisonPanel;
