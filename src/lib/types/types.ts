export interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductCardProps {
  products: Product[]
}

export interface PriceTagProps {
  price: number,
  className?: string,
}

export interface ProductPageProps {
  params: {
    id: string
  }
}