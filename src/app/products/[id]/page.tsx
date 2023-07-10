import NotFound from '@/app/not-found';
import { prisma } from '@/lib/db/prisma';
import { Product, ProductPageProps } from '@/lib/types/types';
import Image from 'next/image';
import PriceTag from '@/components/PriceTag';
import { Metadata } from "next"

export const getProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id }
  });
  return product;
};

export async function generateMetadata({ params: { id } }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product?.name + ' | Next.js Ecommerce',
    description: product?.description,
    openGraph: {
      images: [
        {
          url: product?.imageUrl || '',
          width: 500,
          height: 500,
          alt: product?.name,
        },
      ],
    }
  }
}

export default function ProductPage({ product }: {product: Product}) {
  if (product) {
    return (
      <div className='flex flex-col lg:flex-row gap-4 lg:items-center'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          priority
          className='rounded-lg'
        />

        <div className='flex flex-col justify-center items-center lg:items-start'>
          <h1 className='text-5xl font-bold'>{product.name}</h1>
          <PriceTag price={product.price} className='mt-4' />
          <p className='text-xl py-6 font-semibold'>{product.description}</p>
          This is the details page for {product.name} with id {product.id}
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
}


// import NotFound from '@/app/not-found';
// import { prisma } from '@/lib/db/prisma';
// import { Product, ProductPageProps } from '@/lib/types/types';
// import { cache } from 'react'
// import Image from 'next/image'
// import PriceTag from '@/components/PriceTag';
// import { Metadata } from "next"

// // const getProduct = cache(async (id: string) => {
// //   const product = await prisma.product.findUnique({
// //     where: {id}
// //   })
// //   return product
// // })

// export const getProduct = async (id: string) => {
//   const product = await prisma.product.findUnique({
//     where: { id }
//   });
//   return product;
// };


// export async function generateMetadata({params: {id}}: ProductPageProps): Promise<Metadata> {
//   const product = await getProduct(id)

//   return {
//     title: product?.name + ' | Next.js Ecommerce',
//     description: product?.description,
//     openGraph: {
//       images: [
//         {
//           url: product?.imageUrl || '',
//           width: 500,
//           height: 500,
//           alt: product?.name,
//         },
//       ],
//     }
//   }
// }

//   export default function ProductPage({ product }: { product: Product }) {
//   if (product) {
//     return (
//       <div className='flex flex-col lg:flex-row gap-4 lg:items-center'>
//         <Image
//         src={product.imageUrl} 
//         alt={product.name} 
//         width={500} 
//         height={500}
//         priority
//         className='rounded-lg'
//          />

//         <div className='flex flex-col justify-center items-center lg:items-start'>
//           <h1 className='text-5xl font-bold'>{product.name}</h1>
//           <PriceTag price={product.price} className='mt-4'/>
//           <p className='text-xl py-6 font-semibold'>{product.description}</p>
//           This is the details page for {product.name} with id {product.id}
//         </div>
//       </div>
//     );
//   } else {
//     return <NotFound />
//   }

// }