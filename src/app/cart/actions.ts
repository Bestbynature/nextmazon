'use server';

import { createCart, getCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());
  const item = cart!.items.find((item) => item.product.id === productId);

  if (item) {
    if (quantity > 0) {
      await prisma.cart.update({
        where: { id: cart!.id },
        data: {
          items: {
            update: {
              where: { id: item.id },
              data: { quantity },
            },
          },
        },
      })
      // await prisma.cartItem.update({
      //   where: { id: item.id },
      //   data: { quantity },
      // });
    } else {
      await prisma.cart.update({
        where: { id: cart!.id },
        data: {
          items: {
            delete: { id: item.id },
          },
        },
      })
      // await prisma.cartItem.delete({ where: { id: item.id } });
    }
  } else {
    await prisma.cart.update({
      where: { id: cart!.id },
      data: {
        items: {
          create: {
            productId,
            quantity,
          },
        },
      },
    })
    // await prisma.cartItem.create({
    //   data: {
    //     cartId: cart!.id,
    //     productId,
    //     quantity,
    //   },
    // });
  }

  revalidatePath('/cart');
}
