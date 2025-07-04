
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Leaf, Zap, Droplets, Award } from 'lucide-react';

interface ProductComparison {
  productName: string;
  category: 'clothes' | 'food' | 'supplies';
  suppliers: {
    name: string;
    co2PerUnit: number;
    energyPerUnit: number;
    waterPerUnit: number;
    environmentalScore: number;
    price: number;
    isRecommended: boolean;
  }[];
}

const ProductComparisonPanel = () => {
  const productComparisons: ProductComparison[] = [
    {
      productName: "Organic Cotton T-Shirt",
      category: "clothes",
      suppliers: [
        {
          name: "GreenTech Fabrics",
          co2PerUnit: 2.1,
          energyPerUnit: 15.2,
          waterPerUnit: 180,
          environmentalScore: 92,
          price: 25.99,
          isRecommended: true
        },
        {
          name: "Traditional Textiles",
          co2PerUnit: 4.8,
          energyPerUnit: 28.5,
          waterPerUnit: 320,
          environmentalScore: 45,
          price: 18.99,
          isRecommended: false
        },
        {
          name: "EcoMaterials Co.",
          co2PerUnit: 2.8,
          energyPerUnit: 18.7,
          waterPerUnit: 210,
          environmentalScore: 87,
          price: 23.50,
          isRecommended: false
        }
      ]
    },
    {
      productName: "Recycled Paper (1000 sheets)",
      category: "supplies",
      suppliers: [
        {
          name: "NextGen Materials",
          co2PerUnit: 1.2,
          energyPerUnit: 8.5,
          waterPerUnit: 45,
          environmentalScore: 95,
          price: 12.99,
          isRecommended: true
        },
        {
          name: "Standard Packaging Co.",
          co2PerUnit: 3.4,
          energyPerUnit: 22.1,
          waterPerUnit: 95,
          environmentalScore: 52,
          price: 9.99,
          isRecommended: false
        }
      ]
    }
  ];

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

  return (
    <div className="space-y-6">
      {productComparisons.map((comparison, index) => (
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
                  .sort((a, b) => b.environmentalScore - a.environmentalScore)
                  .map((supplier, supplierIndex) => (
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
                      <Button 
                        size="sm" 
                        variant={supplier.isRecommended ? "default" : "outline"}
                        className={supplier.isRecommended ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        Select
                      </Button>
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
