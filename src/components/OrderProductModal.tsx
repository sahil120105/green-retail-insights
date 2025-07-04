
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Leaf, Zap, Droplets, Award, ShoppingCart } from 'lucide-react';
import type { SupplierProduct } from '@/hooks/useSupabaseData';

interface OrderProductModalProps {
  supplierProduct: SupplierProduct;
  children: React.ReactNode;
}

const OrderProductModal = ({ supplierProduct, children }: OrderProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const queryClient = useQueryClient();

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    
    try {
      const orderNumber = `ORD-${Date.now()}`;
      const totalAmount = supplierProduct.price * quantity;
      const carbonSavings = Math.random() * 5; // Simulated carbon savings calculation
      const energySavings = Math.random() * 50;
      const waterSavings = Math.random() * 100;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          supplier_id: supplierProduct.supplier_id,
          total_amount: totalAmount,
          carbon_savings: carbonSavings,
          energy_savings: energySavings,
          water_savings: waterSavings,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order item
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: order.id,
          supplier_product_id: supplierProduct.id,
          quantity: quantity,
          unit_price: supplierProduct.price,
          total_price: totalAmount
        });

      if (itemError) throw itemError;

      toast.success(`Order ${orderNumber} placed successfully!`);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setIsOpen(false);
      setQuantity(1);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Order Product</span>
          </DialogTitle>
          <DialogDescription>
            Place an order for {supplierProduct.products.name} from {supplierProduct.suppliers.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Product Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold">{supplierProduct.products.name}</div>
            <div className="text-sm text-gray-600">{supplierProduct.suppliers.name}</div>
            <div className="text-lg font-bold text-green-600">${supplierProduct.price}</div>
          </div>

          {/* Environmental Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-1 p-2 bg-red-50 rounded">
              <Leaf className="h-3 w-3 text-red-600" />
              <span>{supplierProduct.co2_per_unit}kg CO₂</span>
            </div>
            <div className="flex items-center space-x-1 p-2 bg-yellow-50 rounded">
              <Zap className="h-3 w-3 text-yellow-600" />
              <span>{supplierProduct.energy_per_unit}kWh</span>
            </div>
            <div className="flex items-center space-x-1 p-2 bg-blue-50 rounded">
              <Droplets className="h-3 w-3 text-blue-600" />
              <span>{supplierProduct.water_per_unit}L water</span>
            </div>
            <div className="flex items-center space-x-1 p-2 bg-green-50 rounded">
              <Award className="h-3 w-3 text-green-600" />
              <span>{supplierProduct.environmental_score}/100</span>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={supplierProduct.stock_quantity}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
            <div className="text-sm text-gray-500">
              {supplierProduct.stock_quantity} units in stock
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Amount:</span>
              <span className="text-lg font-bold text-green-600">
                ${(supplierProduct.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderProductModal;
