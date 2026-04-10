 import { createContext, useContext, useState, ReactNode } from 'react';
 
 export interface WishlistItem {
   id: string;
   name: string;
   price: number;
   image: string;
   category?: string;
 }
 
 interface WishlistContextType {
   items: WishlistItem[];
   addItem: (item: WishlistItem) => void;
   removeItem: (id: string) => void;
   isInWishlist: (id: string) => boolean;
   clearWishlist: () => void;
   itemCount: number;
 }
 
 const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
 
 export const WishlistProvider = ({ children }: { children: ReactNode }) => {
   const [items, setItems] = useState<WishlistItem[]>([]);
 
   const addItem = (item: WishlistItem) => {
     setItems((prev) => {
       if (prev.find((i) => i.id === item.id)) return prev;
       return [...prev, item];
     });
   };
 
   const removeItem = (id: string) => {
     setItems((prev) => prev.filter((item) => item.id !== id));
   };
 
   const isInWishlist = (id: string) => {
     return items.some((item) => item.id === id);
   };
 
   const clearWishlist = () => {
     setItems([]);
   };
 
   const itemCount = items.length;
 
   return (
     <WishlistContext.Provider
       value={{
         items,
         addItem,
         removeItem,
         isInWishlist,
         clearWishlist,
         itemCount,
       }}
     >
       {children}
     </WishlistContext.Provider>
   );
 };
 
 export const useWishlist = () => {
   const context = useContext(WishlistContext);
   if (!context) {
     throw new Error('useWishlist must be used within a WishlistProvider');
   }
   return context;
 };