
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from 'lucide-react';
import { Search } from 'lucide-react';
import ProductTable from './ProductTable';

interface ProductComparisonCardProps {
  comparison: any;
  getCategoryColor: (category: string) => string;
  getScoreColor: (score: number) => string;
}

const ProductComparisonCard = ({ comparison, getCategoryColor, getScoreColor }: ProductComparisonCardProps) => {
  return (
    <Card>
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
            <Search className="h-4 w-4 mr-2" />
            Search Products
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <ProductTable 
          comparison={comparison}
          getCategoryColor={getCategoryColor}
          getScoreColor={getScoreColor}
        />
      </CardContent>
    </Card>
  );
};

export default ProductComparisonCard;
