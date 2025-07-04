
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useOrders } from '@/hooks/useSupabaseData';
import { Package, Calendar, MapPin, Leaf, Zap, Droplets } from 'lucide-react';
import { format } from 'date-fns';

const OrdersPanel = () => {
  const { data: orders, isLoading, error } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'confirmed': return 'bg-purple-100 text-purple-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Error loading orders</div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Orders Found</CardTitle>
          <CardDescription>Start ordering from our sustainable suppliers to see your order history here.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
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

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>Track your sustainable purchasing decisions and their environmental impact</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.order_number}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.suppliers.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {order.suppliers.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(order.order_date), 'MMM dd, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">${order.total_amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs space-y-1">
                      <div className="flex items-center text-green-600">
                        <Leaf className="h-3 w-3 mr-1" />
                        -{order.carbon_savings || 0}t CO₂
                      </div>
                      <div className="flex items-center text-blue-600">
                        <Droplets className="h-3 w-3 mr-1" />
                        -{order.water_savings || 0}L
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPanel;
