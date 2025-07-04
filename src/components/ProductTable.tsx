
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Zap, Droplets, Award } from 'lucide-react';
import OrderProductModal from './OrderProductModal';

interface ProductTableProps {
  comparison: any;
  getCategoryColor: (category: string) => string;
  getScoreColor: (score: number) => string;
}

const ProductTable = ({ comparison, getCategoryColor, getScoreColor }: ProductTableProps) => {
  return (
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
  );
};

export default ProductTable;
