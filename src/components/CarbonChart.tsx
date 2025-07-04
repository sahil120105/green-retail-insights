
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const CarbonChart = () => {
  const monthlyData = [
    { month: 'Jan', footprint: 3.2, target: 2.8 },
    { month: 'Feb', footprint: 2.9, target: 2.7 },
    { month: 'Mar', footprint: 2.5, target: 2.6 },
    { month: 'Apr', footprint: 2.3, target: 2.5 },
    { month: 'May', footprint: 2.1, target: 2.4 },
    { month: 'Jun', footprint: 1.9, target: 2.3 },
  ];

  const supplierData = [
    { name: 'GreenTech Fabrics', emissions: 1.2, color: '#22c55e' },
    { name: 'EcoMaterials Co.', emissions: 1.8, color: '#3b82f6' },
    { name: 'Sustainable Solutions', emissions: 2.4, color: '#f59e0b' },
    { name: 'CleanManufacturing', emissions: 1.5, color: '#8b5cf6' },
    { name: 'Traditional Textiles', emissions: 4.2, color: '#ef4444' },
    { name: 'NextGen Materials', emissions: 0.8, color: '#10b981' },
  ];

  const categoryData = [
    { name: 'Transportation', value: 35, color: '#3b82f6' },
    { name: 'Manufacturing', value: 45, color: '#ef4444' },
    { name: 'Packaging', value: 12, color: '#f59e0b' },
    { name: 'Storage', value: 8, color: '#8b5cf6' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Carbon Footprint Trend */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Carbon Footprint Trend</CardTitle>
          <CardDescription>Monthly carbon emissions vs targets (tons CO₂)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="footprint" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                name="Actual Footprint"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#22c55e" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 3 }}
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Supplier Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Carbon Emissions</CardTitle>
          <CardDescription>Carbon footprint by supplier (tons CO₂)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={supplierData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#666" />
              <YAxis dataKey="name" type="category" width={120} stroke="#666" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="emissions" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Emissions by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Emissions by Category</CardTitle>
          <CardDescription>Distribution of carbon emissions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonChart;
