import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types/types';

const Hero = ({ product }: { product: Product }) => {
  return (
    <div className="hero rounded-xl bg-base-300 flex flex-col lg:flex-row gap-6">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={800}
        priority
        className="w-full max-w-sm rounded-lg shadow-2xl"
      />
      <div className="p-4 lg:p-0">
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <p className="py-6 pr-6 text-justify">{product.description}</p>
        <Link
          href={'/products/' + product.id}
          // href={'/products/' + product.id + '?id=' + product.id}
          className="btn btn-secondary btn-lg"
        >
          Check it out
        </Link>
      </div>
    </div>
  );
};

export default Hero;
