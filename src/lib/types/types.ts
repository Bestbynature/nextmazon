import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma';

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCardProps {
  products: Product[];
}

export interface PriceTagProps {
  price: number;
  className?: string;
}

export interface ProductPageProps {
  params: {
    id: string;
  };
}

export interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type ShoppingCart =
  | (CartWithProducts & {
      size: number;
      subtotal: number;
    })
  | null;
