
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from 'lucide-react';

const CarbonSavingsPanel = () => {
  const recentOrders = [
    { order: 'ORD-2024-001', supplier: 'GreenTech Fabrics', savings: 45 },
    { order: 'ORD-2024-002', supplier: 'EcoMaterials Co.', savings: 32 },
    { order: 'ORD-2024-003', supplier: 'NextGen Materials', savings: 67 },
    { order: 'ORD-2024-004', supplier: 'CleanManufacturing Inc', savings: 28 },
    { order: 'ORD-2024-005', supplier: 'GreenTech Fabrics', savings: 51 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span>Total Carbon Savings</span>
          </CardTitle>
          <CardDescription>
            Cumulative impact from sustainable supplier choices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600 mb-2">2,847 tons CO₂</div>
          <div className="text-sm text-gray-600 mb-4">Equivalent to planting 64,850 trees</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Q1 2024</span>
              <span className="font-semibold">892 tons</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Q2 2024</span>
              <span className="font-semibold">1,124 tons</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Q3 2024</span>
              <span className="font-semibold">831 tons</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Order Impact</CardTitle>
          <CardDescription>
            Carbon savings from your last 10 orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{order.order}</div>
                  <div className="text-xs text-gray-600">{order.supplier}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">-{order.savings} kg CO₂</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonSavingsPanel;
