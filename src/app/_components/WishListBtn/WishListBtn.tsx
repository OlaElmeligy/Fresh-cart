// components/WishlistButton.js
import { useState } from 'react';
import addToWishList from '@/wishListActions/addToWishList';
import removeFromWishList from '@/wishListActions/removeFromWishList';
import { toast } from 'sonner';

export default function WishlistButton({ id }: { id: string }) {
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleWishlistToggle() {
    setLoading(true);
    
    try {
      if (inWishlist) {
        // Remove from wishlist
        const response = await removeFromWishList(id);
        console.log("remove wishlist", response);
        
        if (response.status === "success") {
          setInWishlist(false);
          toast.success("Product removed from wishlist", { 
            position: "top-center", 
            duration: 2000 
          });
        } else {
          toast.error(response.message, { 
            position: "top-center", 
            duration: 2000 
          });
        }
      } else {
        // Add to wishlist
        const response = await addToWishList(id);
        console.log("add wishlist", response);
        
        if (response.status === "success") {
          setInWishlist(true);
          toast.success("Product added to wishlist", { 
            position: "top-center", 
            duration: 2000 
          });
        } else {
          // If adding fails because item already exists, update state
          if (response.message?.includes("already") || response.message?.includes("exist")) {
            setInWishlist(true);
          }
          toast.error(response.message, { 
            position: "top-center", 
            duration: 2000 
          });
        }
      }
    } catch  {
      toast.error("Something went wrong", { 
        position: "top-center", 
        duration: 2000 
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button"
      onClick={handleWishlistToggle}
      disabled={loading}
      className={` cursor-pointer flex-1 inline-flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-colors" 
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? '⏳' : (inWishlist ? '❤️  ' : '🤍  ')}
      {loading ? 'Loading...' : (inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist')}
    </button>
  );
}


