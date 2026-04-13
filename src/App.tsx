import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import InventoryEntry from './components/InventoryEntry';
import Settings from './components/Settings';
import PropertyProfile from './components/PropertyProfile';
import OwnerProfile from './components/OwnerProfile';
import Records from './components/Records';
import { motion, AnimatePresence } from 'motion/react';
import { InventoryItem, PropertyDetails, OwnerDetails } from './types';

type Page = 'home' | 'dashboard' | 'entry' | 'settings' | 'property' | 'owner' | 'records';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  // Load initial state from localStorage
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('inventree_inventory');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>(() => {
    const saved = localStorage.getItem('inventree_property');
    return saved ? JSON.parse(saved) : {
      name: '',
      address: { street: '', city: '', state: '', zip: '', country: '' },
      type: 'Bungalow'
    };
  });

  const [ownerDetails, setOwnerDetails] = useState<OwnerDetails>(() => {
    const saved = localStorage.getItem('inventree_owner');
    return saved ? JSON.parse(saved) : {
      primaryOwner: { name: '', email: '', phone: '' },
      familyMembers: []
    };
  });

  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('inventree_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('inventree_property', JSON.stringify(propertyDetails));
  }, [propertyDetails]);

  useEffect(() => {
    localStorage.setItem('inventree_owner', JSON.stringify(ownerDetails));
  }, [ownerDetails]);

  const addItem = (item: InventoryItem) => {
    setInventory(prev => [item, ...prev]);
  };

  const updateItem = (updatedItem: InventoryItem) => {
    setInventory(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleEditRequest = (item: InventoryItem) => {
    setEditingItem(item);
    setCurrentPage('entry');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onGetStarted={() => setCurrentPage('entry')} />;
      case 'dashboard':
        return <Dashboard inventory={inventory} onEditItem={handleEditRequest} />;
      case 'records':
        return <Records inventory={inventory} onEditItem={handleEditRequest} onDeleteItem={deleteItem} />;
      case 'entry':
        return (
          <InventoryEntry 
            onAddItem={addItem} 
            onUpdateItem={updateItem}
            editingItem={editingItem} 
            onCancelEdit={() => {
              setEditingItem(null);
              setCurrentPage('dashboard');
            }}
          />
        );
      case 'settings':
        return <Settings />;
      case 'property':
        return (
          <PropertyProfile 
            data={propertyDetails} 
            onSave={(data) => {
              setPropertyDetails(data);
            }} 
          />
        );
      case 'owner':
        return (
          <OwnerProfile 
            data={ownerDetails} 
            onSave={(data) => {
              setOwnerDetails(data);
            }} 
          />
        );
      default:
        return <Home onGetStarted={() => setCurrentPage('entry')} />;
    }
  };

  return (
    <Layout currentPath={currentPage} onNavigate={(path) => setCurrentPage(path as Page)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
