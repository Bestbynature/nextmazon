import { getServerSession } from 'next-auth';
import { CartWithProducts, ShoppingCart } from '../types/types';
import { prisma } from './prisma';
import { cookies } from 'next/dist/client/components/headers';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Cart, CartItem } from '@prisma/client';

export const getCart = async (): Promise<ShoppingCart> => {
  const session = await getServerSession(authOptions);

  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
    });
  } else {
    const localCartId = cookies().get('localCartId')?.value;
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { items: { include: { product: true } } },
        })
      : null;
  }

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0),
  };
};

export const createCart = async (): Promise<ShoppingCart> => {
  const session = await getServerSession(authOptions);

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });

    // read more about encryption of cookies and secure settings for real production
    cookies().set('localCartId', newCart.id);
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
};

export async function mergeAnonymousCartIntoUserCart(userId: string) {
  const localCartId = cookies().get('localCartId')?.value;

  const localcart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: true },
      })
    : null;

  if (!localcart) return;

  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {

      const mergedCartItems = mergeCartItems(userCart.items, localcart.items);
      await tx.cartItem.deleteMany({ where: { cartId: userCart.id } });
      
      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
          // updatedAt: new Date(),
        },
      });
      // await tx.cartItem.createMany({
      //   data: mergedCartItems.map((item) => ({
      //     cartId: userCart.id,
      //     productId: item.productId,
      //     quantity: item.quantity,
      //   })),
      // })
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localcart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })), 
            }
          },
        },
      })
    }

    await tx.cart.delete({ where: { id: localcart.id } });
    
    cookies().set('localCartId', "");
  });
}

const mergeCartItems = (...cartItems: CartItem[][]) => {
  return cartItems.reduce((merged, items) => {
    items.forEach((item) => {
      const existingItem = merged.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        merged.push(item);
      }
    });
    return merged;
  }, [] as CartItem[]);
};
