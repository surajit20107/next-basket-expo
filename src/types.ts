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

// export type CartItem = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

export type CartItem = {
  _id: string;
  userId: string;
  productId: {
    _id: string;
    name: string
    price: number;
    description: string
    image: string;
    imagePublicId: string;
    category: string;
    stock: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
  quantity: string;
  totalPrice: number;
};
