import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Package, DollarSign, Camera, FileText, ChevronRight } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  value: number;
  hasPhoto: boolean;
  hasReceipt: boolean;
}

const mockInventory: InventoryItem[] = [
  { id: '1', name: '65" Samsung TV', category: 'Electronics', value: 1200, hasPhoto: true, hasReceipt: true },
  { id: '2', name: 'Leather Sofa Set', category: 'Furniture', value: 2500, hasPhoto: true, hasReceipt: false },
  { id: '3', name: 'MacBook Pro 16"', category: 'Electronics', value: 2800, hasPhoto: true, hasReceipt: true },
  { id: '4', name: 'Diamond Ring', category: 'Jewelry', value: 5000, hasPhoto: false, hasReceipt: true },
  { id: '5', name: 'Kitchen Appliances Set', category: 'Appliances', value: 1800, hasPhoto: true, hasReceipt: false },
];

const categories = ['All', 'Electronics', 'Furniture', 'Jewelry', 'Appliances'];

export default function Inventory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = mockInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalValue = filteredItems.reduce((sum, item) => sum + item.value, 0);

  return (
    <MobileLayout>
      <PageHeader
        title="Home Inventory"
        subtitle={`${mockInventory.length} items`}
        showBack
        rightAction={
          <Button size="icon" variant="ghost">
            <Plus className="h-5 w-5" />
          </Button>
        }
      />

      <div className="flex-1 pb-24">
        {/* Total Value Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pt-4"
        >
          <div className="bg-primary rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Value</p>
                <p className="text-2xl font-bold text-primary-foreground">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="flex-shrink-0"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Inventory Items */}
        <div className="px-4 space-y-3">
          {filteredItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="w-full bg-card rounded-xl border border-border p-4 text-left hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.hasPhoto && (
                      <Badge variant="secondary" className="text-xs h-5">
                        <Camera className="h-3 w-3 mr-1" />
                        Photo
                      </Badge>
                    )}
                    {item.hasReceipt && (
                      <Badge variant="secondary" className="text-xs h-5">
                        <FileText className="h-3 w-3 mr-1" />
                        Receipt
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${item.value.toLocaleString()}</p>
                  <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto mt-1" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Add Item Button */}
        <div className="px-4 mt-6">
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
