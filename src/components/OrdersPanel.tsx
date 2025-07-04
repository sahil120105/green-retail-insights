
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrders } from '@/hooks/useSupabaseData';
import OrdersSummaryCards from './OrdersSummaryCards';
import OrdersTable from './OrdersTable';

const OrdersPanel = () => {
  const { data: orders, isLoading, error } = useOrders();

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
      <OrdersSummaryCards orders={orders} />
      <OrdersTable orders={orders} />
    </div>
  );
};

export default OrdersPanel;
