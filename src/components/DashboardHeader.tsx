
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Leaf } from 'lucide-react';

interface DashboardHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const DashboardHeader = ({ searchTerm, onSearchChange }: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EcoSupply Dashboard</h1>
              <p className="text-sm text-gray-600">Sustainable Supply Chain Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              Add Supplier
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
