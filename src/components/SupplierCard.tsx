
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, MapPin, Leaf, Award } from 'lucide-react';

interface SupplierCardProps {
  name: string;
  location: string;
  sustainabilityScore: number;
  carbonFootprint: number;
  certifications: string[];
  trend: 'up' | 'down' | 'stable';
}

const SupplierCard = ({ 
  name, 
  location, 
  sustainabilityScore, 
  carbonFootprint, 
  certifications, 
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

        {/* Carbon Footprint */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Carbon Footprint</span>
          </div>
          <span className="text-sm font-medium">{carbonFootprint} tons CO₂</span>
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
            View Details
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
