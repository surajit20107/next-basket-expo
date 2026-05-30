export type ProductType = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
};

export type ProductResponse = {
  products: ProductType[];
  hasMore: boolean;
};
