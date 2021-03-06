import { ImageSlider, Product } from './../../shared';
export interface ProductVariant {
  id: number;
  product: Product;
  name: string;
  price: number;
  listPrice: number;
  productVariantImages: ImageSlider[];
}

export interface GroupOrder {
  id: number;
  productId: number;
  startBy: string;
  avatar: string;
  startAt: Date;
  remainingNumber: number;
}
