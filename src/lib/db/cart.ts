import { ShoppingCart } from '../types/types';
import { prisma } from './prisma';
import { cookies } from 'next/dist/client/components/headers';

export const getCart = async (): Promise<ShoppingCart> => {
  const localCartId = cookies().get('localCartId')?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } },
      })
    : null;
  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0),
  };
};

export const createCart = async (): Promise<ShoppingCart> => {
  const newCart = await prisma.cart.create({
    data: {},
  });

  cookies().set('localCartId', newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
};
