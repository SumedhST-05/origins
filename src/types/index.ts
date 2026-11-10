export interface ColorOption {
  name: string;
  hex: string;
  accentHex?: string;
  badge?: string;
}

export interface Hotspot {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  cameraTarget?: [number, number, number];
}

export interface ProductSpecifications {
  upperMaterial: string;
  soleTechnology: string;
  weight: string;
  drop: string;
  cushioning: string;
  origin: string;
  sustainability: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  edition: string;
  price: number;
  currency: string;
  category: 'All' | 'Lifestyle' | 'Performance' | 'Limited Edition' | 'Atelier Reserve';
  modelPath: string;
  description: string;
  story: string;
  featured: boolean;
  isActive: boolean; // Controls whether product is active or deactivated/hidden in storefront
  inventory: number; // Real-time stock count
  isNew?: boolean;
  availability: 'In Stock' | 'Limited Stock' | 'Pre-order';
  rating: number;
  reviewCount: number;
  availableSizes: number[];
  availableColors: ColorOption[];
  images: string[];
  highlights: string[];
  specifications: ProductSpecifications;
  hotspots?: Hotspot[];
  badge?: string;
  accentColor?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: number;
  selectedColor: ColorOption;
  quantity: number;
}

export interface UserAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: UserAddress;
  paymentMethod: string;
  status: 'Confirmed' | 'In Fulfilment' | 'Dispatched' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  savedAddresses: UserAddress[];
  orderHistory: Order[];
}
