
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Leaf, Star, ArrowRight, Award } from 'lucide-react';

const RecommendationsPanel = () => {
  const recommendations = [
    {
      currentSupplier: "Traditional Textiles",
      currentScore: 45,
      currentEmissions: 4.2,
      recommendedSupplier: "NextGen Materials",
      recommendedScore: 95,
      recommendedEmissions: 0.8,
      potentialSavings: 3.4,
      category: "Textiles",
      reason: "Higher sustainability certifications and 81% lower carbon footprint"
    },
    {
      currentSupplier: "Standard Packaging Co.",
      currentScore: 52,
      currentEmissions: 2.8,
      recommendedSupplier: "EcoPackaging Solutions",
      recommendedScore: 88,
      recommendedEmissions: 1.1,
      potentialSavings: 1.7,
      category: "Packaging",
      reason: "Recycled materials and carbon-neutral shipping options"
    },
    {
      currentSupplier: "MidRange Materials",
      currentScore: 67,
      currentEmissions: 2.1,
      recommendedSupplier: "GreenTech Fabrics",
      recommendedScore: 92,
      recommendedEmissions: 1.2,
      potentialSavings: 0.9,
      category: "Materials",
      reason: "Better renewable energy usage and waste reduction programs"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-green-600" />
            <span>Sustainability Improvement Opportunities</span>
          </CardTitle>
          <CardDescription>
            Switch to these recommended suppliers to reduce your carbon footprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">6.0 tons</div>
              <div className="text-sm text-gray-600">Potential CO₂ Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">+28 points</div>
              <div className="text-sm text-gray-600">Avg Score Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Suppliers to Switch</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Switch from {rec.currentSupplier}</CardTitle>
                  <CardDescription className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{rec.category}</Badge>
                    <span>•</span>
                    <span>Potential savings: {rec.potentialSavings} tons CO₂</span>
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  High Impact
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Supplier */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">Current: {rec.currentSupplier}</span>
                  </div>
                  <div className="space-y-2 pl-5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sustainability Score</span>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(rec.currentScore)}`}>
                        {rec.currentScore}/100
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Carbon Emissions</span>
                      <span className="text-sm font-medium">{rec.currentEmissions} tons CO₂</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Supplier */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">Recommended: {rec.recommendedSupplier}</span>
                  </div>
                  <div className="space-y-2 pl-5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sustainability Score</span>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(rec.recommendedScore)}`}>
                        {rec.recommendedScore}/100
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Carbon Emissions</span>
                      <span className="text-sm font-medium">{rec.recommendedEmissions} tons CO₂</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason and Action */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Award className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-700">{rec.reason}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2 text-green-600">
                  <Leaf className="h-4 w-4" />
                  <span className="text-sm font-medium">Save {rec.potentialSavings} tons CO₂ annually</span>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Make Switch
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPanel;
