import { ProductCardProps } from '@/lib/types/types';
import Link from 'next/link';
import PriceTag from './PriceTag';
import Image from 'next/image';

const ProductCard = ({ products }: ProductCardProps) => {
  const isNew = (createdAt: Date) => {
    return Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;
  };

  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <Link
            href={{
              pathname: '/products/' + product.id,
              // query: { id: product.id },
            }}
            // as={`/products/${product.id}?id=${product.id}`}
            className="card w-full bg-base-100 hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <figure>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={800}
                height={400}
                className="h-48 object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              {isNew(product.createdAt) && (
                <span className="badge badge-outline badge-accent">New</span>
              )}
              <p>
                {product.description.length > 100
                  ? product.description.substring(0, 100) + '...'
                  : product.description}
              </p>
              <PriceTag price={product.price} />
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
