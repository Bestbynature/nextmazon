import NotFound from '@/app/not-found';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import PriceTag from '@/components/PriceTag';
import { Metadata } from 'next';
import { cache } from 'react';
import AddToCartButton from './AddToCartButton';
import IncrementProductQuantity from './actions';
import { ProductPageProps } from '@/lib/types/types';

export async function generateMetadata({params: {id}}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product?.name + ' | Next.js Ecommerce' || '',
    description: product?.description || '',
    openGraph: {
      images: [
        {
          url: product?.imageUrl || '',
          width: 500,
          height: 500,
          alt: product?.name,
        },
      ],
      title: product?.name + ' | Next.js Ecommerce' || '',
      description: product?.description || '',
    },
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if(!product) return null;
  return product;
});

export default async function ProductPage({params: {id}}: ProductPageProps) {
  // export default async function ProductPage({ searchParams: { id } }: { searchParams: { id: string } }) {
  // const loadProduct = async () => {
    const product = await getProduct(id as string);

    if(!product) {
      return <NotFound />
    }

      return (
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            priority
            className="rounded-lg"
          />

          <div className="flex flex-col justify-center items-center lg:items-start">
            <h1 className="text-5xl font-bold">{product.name}</h1>
            <PriceTag price={product.price} className="mt-4" />
            <p className="text-xl py-6 font-semibold">{product.description}</p>
            <AddToCartButton
              productId={product.id}
              incrementProductQuantity={IncrementProductQuantity}
            />
          </div>
        </div>
      );

  // return <>{loadProduct()}</>;
}
