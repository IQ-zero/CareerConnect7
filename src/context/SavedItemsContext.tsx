import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SavedItem {
  id: string;
  type: 'job' | 'company' | 'event' | 'course';
  title: string;
  subtitle?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  company?: string;
  salary?: string;
  attendees?: number;
  savedAt: Date;
  imageUrl?: string;
  url?: string;
}

interface SavedItemsContextType {
  savedItems: SavedItem[];
  addItem: (item: Omit<SavedItem, 'savedAt'>) => void;
  removeItem: (id: string) => void;
  isItemSaved: (id: string) => boolean;
  clearAllItems: () => void;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export const useSavedItems = () => {
  const context = useContext(SavedItemsContext);
  if (!context) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return context;
};

interface SavedItemsProviderProps {
  children: ReactNode;
}

export const SavedItemsProvider = ({ children }: SavedItemsProviderProps) => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  // Load saved items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedItems');
    if (saved) {
      try {
        const parsedItems = JSON.parse(saved).map((item: any) => ({
          ...item,
          savedAt: new Date(item.savedAt)
        }));
        setSavedItems(parsedItems);
      } catch (error) {
        console.error('Error loading saved items:', error);
      }
    }
  }, []);

  // Save to localStorage whenever savedItems changes
  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  const addItem = (item: Omit<SavedItem, 'savedAt'>) => {
    const newItem: SavedItem = {
      ...item,
      savedAt: new Date()
    };
    setSavedItems(prev => [newItem, ...prev]);
  };

  const removeItem = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const isItemSaved = (id: string) => {
    return savedItems.some(item => item.id === id);
  };

  const clearAllItems = () => {
    setSavedItems([]);
    localStorage.removeItem('savedItems');
  };

  const value: SavedItemsContextType = {
    savedItems,
    addItem,
    removeItem,
    isItemSaved,
    clearAllItems
  };

  return (
    <SavedItemsContext.Provider value={value}>
      {children}
    </SavedItemsContext.Provider>
  );
};

export default SavedItemsContext;
