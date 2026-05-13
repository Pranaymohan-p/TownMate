export interface User {
  id: string;
  phoneNumber: string;
  fullName: string;
  email?: string;
  role: 'CUSTOMER' | 'TRAVELER';
  profileImage?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Request {
  id: string;
  customerId: string;
  productName: string;
  brand?: string;
  priceRange: string;
  status: 'PENDING' | 'ACCEPTED' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED';
  urgency?: 'HIGH' | 'MEDIUM' | 'LOW';
  pickupLocation: string;
  dropLocation: string;
  notes?: string;
  photos?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  travelerId: string;
  source: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  isActive: boolean;
  capacity: number;
  availableSpace: number;
  price: number;
  vehicleType: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  reason: string;
  relatedId?: string;
  createdAt: string;
}

export interface Rating {
  id: string;
  fromUserId: string;
  toUserId: string;
  score: number;
  review?: string;
  relatedId: string;
  relatedType: 'TRIP' | 'REQUEST';
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}
