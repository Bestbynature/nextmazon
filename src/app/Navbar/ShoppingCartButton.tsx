'use client';

import { FormatPrice } from '@/lib/format';
import { ShoppingCartButtonprops } from '@/lib/types/types';
import { AddShoppingCart } from '@mui/icons-material';
import Link from 'next/link';

const ShoppingCartButton = ({ cart }: ShoppingCartButtonprops) => {
  const closeDropDown = () => {
    const element = document.activeElement as HTMLElement;
    if (element) element.blur();
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn-ghost btn-circle btn">
        <div className="indicator">
          <AddShoppingCart />
          <span className="badge badge-sm indicator-item">{cart?.size || 0}</span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact mt-3 w-52 bg-base-200 shadow z-30"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0} Items</span>
          <span className="text-info">Subtotal: {FormatPrice(cart?.subtotal || 0)}</span>
          <div className="card-actions">
            <Link href="/cart" className="btn btn-block btn-primary" onClick={closeDropDown}>
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartButton;
