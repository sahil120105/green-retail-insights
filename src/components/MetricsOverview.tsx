
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Award, Leaf, Users, Target } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const MetricsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Avg Sustainability Score
          </CardTitle>
          <Award className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800">78.5</div>
          <div className="flex items-center space-x-1 mt-1">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-600">+5.2% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">
            Carbon Footprint
          </CardTitle>
          <Leaf className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-800">2.1 <span className="text-sm">tons CO₂</span></div>
          <div className="flex items-center space-x-1 mt-1">
            <TrendingDown className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-600">-12.3% reduction</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">
            Active Suppliers
          </CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-800">24</div>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
              18 Certified
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700">
            Sustainability Goal
          </CardTitle>
          <Target className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-800">73%</div>
          <div className="text-xs text-orange-600 mt-1">
            Target: 85% by Q4 2024
          </div>
          <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{ width: '73%' }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
