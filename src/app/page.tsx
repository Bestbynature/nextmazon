import { prisma } from '@/lib/db/prisma';
import Hero from '@/components/Hero';
import { HomeProps } from '@/lib/types/types';
import PaginationBar from '@/components/PaginationBar';
import ProductCard from '@/components/productCard';

// export const revalidate = 0;

export default async function Home({ searchParams: { page = '1' } }: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;
  
  const totalItemCount = await prisma.product.count();
  
  const heroItemCount = 1;

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    <div className="flex flex-col items-center">
      {currentPage === 1 && <Hero product={products[0]} />}

      <div className="grid grid-cols-1 my-4 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <ProductCard products={currentPage === 1 ? products.slice(1) : products} />
      </div>

      {totalPages > 1 && <PaginationBar currentPage={currentPage} totalPage={totalPages} />}
    </div>
  );
}
