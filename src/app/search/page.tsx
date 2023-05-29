import ProductCard from '@/components/productCard';
import { prisma } from '@/lib/db/prisma';
import { SearchPageProps } from '@/lib/types/types';
import React from 'react'

export function generateMetadata({searchParams: {query}}: SearchPageProps) {
  return {
    title: `Search: ${query} - NextMazon`,
  }
}

const SearchPage = async ({searchParams: {query}}: SearchPageProps) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {name: {contains: query, mode: "insensitive"}},
        {description: {contains: query, mode: "insensitive"}},
      ]
    },
    orderBy: {createdAt: 'desc'},
  })

  if (products.length === 0) {
    return (
      <div>
        <h1 className="text-2xl text-center font-bold">No products found</h1>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
      {/* {products.map((product) => ( */}
        <ProductCard products={products} />
      {/* ))} */}
    </div>
  )
}

export default SearchPage