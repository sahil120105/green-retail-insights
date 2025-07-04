
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Supplier {
  id: string;
  name: string;
  location: string;
  sustainability_score: number;
  carbon_footprint: number;
  energy_consumption: number;
  water_usage: number;
  certifications: string[];
  trend: 'up' | 'down' | 'stable';
}

export interface Product {
  id: string;
  name: string;
  category: 'clothes' | 'food' | 'supplies';
}

export interface SupplierProduct {
  id: string;
  supplier_id: string;
  product_id: string;
  price: number;
  co2_per_unit: number;
  energy_per_unit: number;
  water_per_unit: number;
  environmental_score: number;
  stock_quantity: number;
  suppliers: Supplier;
  products: Product;
}

export interface Order {
  id: string;
  order_number: string;
  supplier_id: string;
  total_amount: number;
  carbon_savings: number;
  energy_savings: number;
  water_savings: number;
  status: string;
  order_date: string;
  suppliers: Supplier;
}

export const useSuppliers = () => {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('sustainability_score', { ascending: false });
      
      if (error) throw error;
      return data as Supplier[];
    }
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Product[];
    }
  });
};

export const useSupplierProducts = () => {
  return useQuery({
    queryKey: ['supplier-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('supplier_products')
        .select(`
          *,
          suppliers(*),
          products(*)
        `)
        .order('environmental_score', { ascending: false });
      
      if (error) throw error;
      return data as SupplierProduct[];
    }
  });
};

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          suppliers(*)
        `)
        .order('order_date', { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    }
  });
};
