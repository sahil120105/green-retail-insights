
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Package, Leaf, Zap, Droplets } from 'lucide-react';
import type { Order } from '@/hooks/useSupabaseData';

interface OrdersSummaryCardsProps {
  orders: Order[];
}

const OrdersSummaryCards = ({ orders }: OrdersSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-blue-600" />
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="text-2xl font-bold">{orders.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Leaf className="h-4 w-4 text-green-600" />
            <div className="text-sm text-gray-600">Carbon Saved</div>
          </div>
          <div className="text-2xl font-bold">
            {orders.reduce((sum, order) => sum + (order.carbon_savings || 0), 0).toFixed(1)}t
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-600" />
            <div className="text-sm text-gray-600">Energy Saved</div>
          </div>
          <div className="text-2xl font-bold">
            {orders.reduce((sum, order) => sum + (order.energy_savings || 0), 0).toFixed(1)}kWh
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-600" />
            <div className="text-sm text-gray-600">Water Saved</div>
          </div>
          <div className="text-2xl font-bold">
            {orders.reduce((sum, order) => sum + (order.water_savings || 0), 0).toFixed(1)}L
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersSummaryCards;
