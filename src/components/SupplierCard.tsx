
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, MapPin, Leaf, Award, Droplets, Zap } from 'lucide-react';

interface Product {
  name: string;
  category: 'clothes' | 'food' | 'supplies';
  co2PerUnit: number;
  energyPerUnit: number;
  waterPerUnit: number;
  environmentalScore: number;
}

interface SupplierCardProps {
  name: string;
  location: string;
  sustainabilityScore: number;
  carbonFootprint: number;
  energyConsumption: number;
  waterUsage: number;
  certifications: string[];
  products: Product[];
  trend: 'up' | 'down' | 'stable';
}

const SupplierCard = ({ 
  name, 
  location, 
  sustainabilityScore, 
  carbonFootprint,
  energyConsumption,
  waterUsage,
  certifications, 
  products,
  trend 
}: SupplierCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'clothes': return 'bg-purple-100 text-purple-700';
      case 'food': return 'bg-orange-100 text-orange-700';
      case 'supplies': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{name}</CardTitle>
            <CardDescription className="flex items-center space-x-1 mt-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Sustainability Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Sustainability Score</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-sm font-semibold ${getScoreColor(sustainabilityScore)}`}>
            {sustainabilityScore}/100
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center p-2 bg-red-50 rounded">
            <Leaf className="h-3 w-3 mx-auto mb-1 text-red-600" />
            <div className="font-medium text-red-700">{carbonFootprint}t</div>
            <div className="text-red-600">CO₂</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded">
            <Zap className="h-3 w-3 mx-auto mb-1 text-yellow-600" />
            <div className="font-medium text-yellow-700">{energyConsumption}</div>
            <div className="text-yellow-600">kWh</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded">
            <Droplets className="h-3 w-3 mx-auto mb-1 text-blue-600" />
            <div className="font-medium text-blue-700">{waterUsage}L</div>
            <div className="text-blue-600">Water</div>
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="text-sm text-gray-600 mb-2">Products ({products.length})</div>
          <div className="flex flex-wrap gap-1">
            {products.slice(0, 3).map((product, index) => (
              <Badge key={index} variant="secondary" className={`text-xs ${getCategoryColor(product.category)}`}>
                {product.name}
              </Badge>
            ))}
            {products.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                +{products.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="text-sm text-gray-600 mb-2">Certifications</div>
          <div className="flex flex-wrap gap-1">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Products
          </Button>
          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
            Order Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierCard;
