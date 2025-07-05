
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
      // First get suppliers
      const { data: suppliersData, error: suppliersError } = await supabase
        .from('suppliers')
        .select('*')
        .order('sustainability_score', { ascending: false });
      
      if (suppliersError) throw suppliersError;

      // Then get certifications for each supplier
      const { data: certificationsData, error: certificationsError } = await supabase
        .from('supplier_certificate')
        .select(`
          supp_id,
          certification:certificate_id(name)
        `);
      
      if (certificationsError) throw certificationsError;

      // Group certifications by supplier
      const certificationsBySupplier = certificationsData?.reduce((acc: any, item) => {
        if (!acc[item.supp_id]) {
          acc[item.supp_id] = [];
        }
        if (item.certification?.name) {
          acc[item.supp_id].push(item.certification.name);
        }
        return acc;
      }, {}) || {};

      // Combine suppliers with their certifications and add trend
      const suppliersWithCertifications = suppliersData?.map(supplier => ({
        ...supplier,
        certifications: certificationsBySupplier[supplier.id] || [],
        trend: 'up' as const // Default trend since it's not in the new schema
      })) || [];

      return suppliersWithCertifications as Supplier[];
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
      // Get supplier products with basic supplier and product info
      const { data: supplierProductsData, error: spError } = await supabase
        .from('supplier_products')
        .select(`
          *,
          suppliers(id, name, location, sustainability_score, carbon_footprint, energy_consumption, water_usage),
          products(*)
        `)
        .order('environmental_score', { ascending: false });
      
      if (spError) throw spError;

      // Get certifications for all suppliers
      const { data: certificationsData, error: certificationsError } = await supabase
        .from('supplier_certificate')
        .select(`
          supp_id,
          certification:certificate_id(name)
        `);
      
      if (certificationsError) throw certificationsError;

      // Group certifications by supplier
      const certificationsBySupplier = certificationsData?.reduce((acc: any, item) => {
        if (!acc[item.supp_id]) {
          acc[item.supp_id] = [];
        }
        if (item.certification?.name) {
          acc[item.supp_id].push(item.certification.name);
        }
        return acc;
      }, {}) || {};

      // Combine supplier products with certifications and trend
      const enrichedSupplierProducts = supplierProductsData?.map(sp => ({
        ...sp,
        suppliers: {
          ...sp.suppliers,
          certifications: certificationsBySupplier[sp.suppliers.id] || [],
          trend: 'up' as const // Default trend since it's not in the new schema
        }
      })) || [];

      return enrichedSupplierProducts as SupplierProduct[];
    }
  });
};

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      // Get orders with basic supplier info
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          suppliers(id, name, location, sustainability_score, carbon_footprint, energy_consumption, water_usage)
        `)
        .order('order_date', { ascending: false });
      
      if (ordersError) throw ordersError;

      // Get certifications for all suppliers
      const { data: certificationsData, error: certificationsError } = await supabase
        .from('supplier_certificate')
        .select(`
          supp_id,
          certification:certificate_id(name)
        `);
      
      if (certificationsError) throw certificationsError;

      // Group certifications by supplier
      const certificationsBySupplier = certificationsData?.reduce((acc: any, item) => {
        if (!acc[item.supp_id]) {
          acc[item.supp_id] = [];
        }
        if (item.certification?.name) {
          acc[item.supp_id].push(item.certification.name);
        }
        return acc;
      }, {}) || {};

      // Combine orders with supplier certifications and trend
      const enrichedOrders = ordersData?.map(order => ({
        ...order,
        suppliers: {
          ...order.suppliers,
          certifications: certificationsBySupplier[order.suppliers.id] || [],
          trend: 'up' as const // Default trend since it's not in the new schema
        }
      })) || [];

      return enrichedOrders as Order[];
    }
  });
};
