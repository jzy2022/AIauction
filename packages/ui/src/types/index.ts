// User types
export enum UserRole {
  ADMIN = 'ADMIN',
  BIDDER = 'BIDDER',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
  createdAt: Date;
}

// Product types
export interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  startingPrice: number;
  incrementStep: number;
  createdAt: Date;
}

// Auction types
export enum AuctionStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  ENDED = 'ENDED',
  CANCELLED = 'CANCELLED',
}

export interface AuctionSession {
  id: string;
  productId: string;
  product?: Product;
  status: AuctionStatus;
  startTime: Date;
  endTimePlanned: Date;
  endTimeActual?: Date;
  antiSnipeWindowSec: number;
  antiSnipeExtendSec: number;
  currentPrice: number;
  leadingBidId?: string;
  createdById: string;
  createdBy?: User;
  createdAt: Date;
}

// Bid types
export interface Bid {
  id: string;
  sessionId: string;
  session?: AuctionSession;
  userId: string;
  user?: User;
  amount: number;
  isLeading: boolean;
  createdAt: Date;
}

// Order types
export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export interface Order {
  id: string;
  sessionId: string;
  session?: AuctionSession;
  winnerUserId: string;
  winner?: User;
  finalPrice: number;
  status: OrderStatus;
  createdAt: Date;
}

// Socket.IO Event types
export interface SocketEvents {
  // Client to Server
  join_room: { sessionId: string };
  leave_room: { sessionId: string };
  place_bid: { sessionId: string; amount: number };
  send_message: { sessionId: string; text: string };
  
  // Server to Client
  auction_state: {
    sessionId: string;
    status: AuctionStatus;
    currentPrice: number;
    leadingUserId?: string;
    timeRemainingSec: number;
  };
  bid_accepted: {
    bidId: string;
    amount: number;
    userId: string;
    sessionId: string;
  };
  bid_rejected: { reason: string };
  chat_message: {
    userId: string;
    text: string;
    timestamp: Date;
  };
}

// Digital Human types
export interface VisemeFrame {
  timestamp: number; // milliseconds
  viseme: string; // mouth shape identifier
  intensity: number; // 0-1
}

export interface TTSResponse {
  audioUrl: string;
  duration: number; // milliseconds
  visemeTimeline: VisemeFrame[];
}

export interface DigitalHumanProvider {
  synthesizeSpeech(text: string): Promise<TTSResponse>;
  getAvailableVoices(): Promise<string[]>;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}