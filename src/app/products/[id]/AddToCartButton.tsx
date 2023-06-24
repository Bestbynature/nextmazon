'use client';

import { AddToCartButtonProps } from '@/lib/types/types';
import { AddShoppingCart } from '@mui/icons-material';
import { useState, useTransition } from 'react';

const AddToCartButton = ({ productId, incrementProductQuantity }: AddToCartButtonProps) => {
  
  const [isPending, startTransition] = useTransition();
  const [success , setSuccess] = useState(false);
  
  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-secondary" onClick={() => {
        setSuccess(false);
        startTransition(async () => {
          await incrementProductQuantity(productId);
          setSuccess(true);
        });
      }}>
        Add To cart
        <AddShoppingCart />
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && <span className="text-green-500">Added to cart</span>}
    </div>
  );
};

export default AddToCartButton;
