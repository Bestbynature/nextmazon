import Hero from '@/components/Hero';
import ProductCard from '@/components/productCard';
import { prisma } from '@/lib/db/prisma';


export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {createdAt: "desc"}
  })

  return (
    <div>
      <Hero product={products[0]} />

      <div className='my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        <ProductCard products={products.slice(1)}/>
      </div>
    </div>
  );
}
