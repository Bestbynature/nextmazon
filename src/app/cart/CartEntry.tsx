'use client';

import { CartItemWithProducts } from '@/lib/types/types';
import Link from 'next/link';
import Image from 'next/image';
import { FormatPrice } from '@/lib/format';
import { useTransition } from 'react';

interface CartEntryProps {
  cartItem: CartItemWithProducts;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartEntry = ({ cartItem: { product, quantity }, setProductQuantity }: CartEntryProps) => {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          width={200}
          height={200}
          alt={product.name}
          title={product.name}
          className="rounded-lg"
        />
        <div>
          <Link className="font-bold" href={`/products/${product.id}`}>
            {product.name}
          </Link>
          <div>Price: {FormatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
              className="select select-bordered w-full max-w-[80px]"
            >
              <option value={0}>0 (Remove) </option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-2">
            Total: {FormatPrice(product.price * quantity)}
            {isPending && <span className="loading loading-spinner loading-sm">Updating...</span>}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};

export default CartEntry;
