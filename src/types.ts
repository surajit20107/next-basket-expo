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

export type CartItem = {
  _id: string;
  userId: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    description: string;
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

export type orderRespone = {
  _id: string;
  userId: string;
  products: {
    product: {
      _id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }[];
  totalPrice: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  createdAt: string;
};

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  imagePublicId: string;
  category: string;
  stock: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  _id: string;
  quantity: number;
  product: Product;
}

export interface OrderResponse {
  _id: string;
  userId: string;
  products: OrderProduct[];
  totalPrice: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentId: string;
  paymentSignature: string;
  paymentDate: string;
  deliveryDate: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryCountry: string;
  deliveryPincode: string;
  deliveryPhone: string;
  deliveryEmail: string;
  createdAt: string;
  updatedAt: string;
}