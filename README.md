# AI Auction Platform - Digital Human Live Stream Auctions

A comprehensive monorepo platform for conducting live stream auctions hosted by AI-powered digital humans. Built with modern web technologies for scalability and real-time interactions.

## 🏗️ Architecture

```
aiauction/
├── apps/
│   ├── web/          # Next.js 14 (App Router) frontend
│   └── server/       # NestJS backend with Prisma + PostgreSQL
├── packages/
│   └── ui/           # Shared React components & TypeScript types
├── docker-compose.yml # Development services (Postgres + Redis)
└── pnpm-workspace.yaml # Monorepo configuration
```

### Tech Stack

**Frontend (apps/web):**
- ⚛️ Next.js 14 with App Router
- 🎨 TailwindCSS + shadcn/ui components
- 📱 Responsive design with dark mode support
- 🔗 Socket.IO client for real-time updates
- 📺 HLS.js for live video streaming
- 🎯 TypeScript throughout

**Backend (apps/server):**
- 🚀 NestJS framework
- 🗄️ Prisma ORM with PostgreSQL
- ⚡ Socket.IO for WebSocket connections
- 📨 Redis for caching and rate limiting
- 🔐 JWT authentication with bcrypt
- 🛡️ Input validation and security

**Shared (packages/ui):**
- 📦 Shared TypeScript types and interfaces
- 🎯 Socket.IO event definitions
- 🔧 Utility functions
- 📋 Domain models and enums

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Docker & Docker Compose

### Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository>
   cd AIauction
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy example files
   cp .env.example .env
   cp apps/server/.env.example apps/server/.env
   cp apps/web/.env.example apps/web/.env.local
   
   # Update .env files with your configuration
   ```

3. **Start development services:**
   ```bash
   # Start PostgreSQL and Redis
   docker compose up -d
   
   # Run database migrations and seed data
   pnpm db:migrate
   pnpm db:seed
   ```

4. **Start the development servers:**
   ```bash
   # Start both web and server in watch mode
   pnpm dev
   ```

   Or start individually:
   ```bash
   # Terminal 1: Start server (port 3001)
   pnpm --filter=server dev
   
   # Terminal 2: Start web app (port 3000)
   pnpm --filter=web dev
   ```

5. **Access the application:**
   - Web App: http://localhost:3000
   - API Server: http://localhost:3001
   - Database: postgres://localhost:5432/aiauction

### Test Credentials

After running `pnpm db:seed`:
- **Admin:** admin@aiauction.com / admin123
- **Bidder:** bidder@example.com / bidder123

## 📋 Features (Phase 1)

### ✅ Implemented
- [x] Monorepo setup with pnpm workspaces
- [x] Next.js 14 web application with TailwindCSS
- [x] NestJS server with TypeScript
- [x] PostgreSQL database with Prisma ORM
- [x] Docker Compose for development services
- [x] Shared TypeScript types and interfaces
- [x] JWT authentication system
- [x] User management (Admin/Bidder roles)
- [x] Database schema for auctions, bids, products
- [x] Environment configuration
- [x] Build system and development scripts

### 🚧 In Progress
- [ ] Socket.IO real-time bidding system
- [ ] Anti-sniping auction logic
- [ ] HLS video player integration
- [ ] Admin dashboard pages
- [ ] Live auction room interface
- [ ] Digital human TTS/lip-sync placeholders
- [ ] Rate limiting and security features
- [ ] Comprehensive testing suite

### 📅 Planned
- [ ] Background auction timers
- [ ] Order and payment tracking
- [ ] WebSocket chat system
- [ ] Advanced admin controls
- [ ] Mobile responsive design
- [ ] Production deployment setup

## 🗄️ Database Schema

### Core Models

**Users**
- Authentication (email/password, JWT)
- Roles: ADMIN, BIDDER
- Profile information

**Products**
- Digital human asset information
- Pricing and increment rules
- Image galleries

**Auction Sessions**
- Status: DRAFT, SCHEDULED, LIVE, ENDED, CANCELLED
- Timing and anti-sniping configuration
- Current price and leading bid tracking

**Bids**
- Real-time bid tracking
- Leading bid identification
- User and session relationships

**Orders**
- Winner determination
- Payment status tracking
- Final price recording

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### WebSocket Events
- `join_room { sessionId }` - Join auction room
- `place_bid { sessionId, amount }` - Place bid
- `send_message { sessionId, text }` - Send chat message
- `auction_state` - Receive auction updates
- `bid_accepted/rejected` - Bid status notifications

## 🛠️ Available Scripts

### Root Level
- `pnpm dev` - Start all services in development mode
- `pnpm build` - Build all applications
- `pnpm start` - Start built applications
- `pnpm test` - Run all tests
- `pnpm lint` - Lint all code
- `pnpm format` - Format code with Prettier

### Database Management
- `pnpm db:migrate` - Run Prisma migrations
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:reset` - Reset database
- `pnpm db:seed` - Seed test data

### Individual Apps
- `pnpm --filter=server <command>` - Run server commands
- `pnpm --filter=web <command>` - Run web commands
- `pnpm --filter=ui <command>` - Run UI package commands

## 🌍 Environment Variables

### Root (.env)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aiauction
REDIS_URL=redis://localhost:6379
JWT_SECRET=change_me_in_production
NODE_ENV=development
```

### Server (apps/server/.env)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aiauction
REDIS_URL=redis://localhost:6379
JWT_SECRET=change_me_in_production
SERVER_PORT=3001
```

### Web (apps/web/.env.local)
```env
NEXT_PUBLIC_HLS_URL=https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
WEB_PORT=3000
```

## 🔄 Real-time Bidding Flow

1. **Join Auction:** Client connects to Socket.IO room for specific session
2. **Place Bid:** Validate amount, increment, user eligibility
3. **Anti-Sniping:** Extend auction if bid placed near end time
4. **Broadcast:** Notify all room participants of bid updates
5. **Rate Limiting:** Prevent spam bidding using Redis
6. **Winner Determination:** Automatically create order when auction ends

## 🎭 Digital Human Integration

The platform includes placeholder interfaces for digital human providers:

```typescript
interface DigitalHumanProvider {
  synthesizeSpeech(text: string): Promise<TTSResponse>;
  getAvailableVoices(): Promise<string[]>;
}

interface TTSResponse {
  audioUrl: string;
  duration: number;
  visemeTimeline: VisemeFrame[];
}
```

Ready for integration with providers like Azure, ByteDance, or custom TTS systems.

## 🧪 Testing

### Unit Tests
- Bid validation logic
- Anti-sniping calculations
- Authentication flows

### E2E Tests
- Complete auction workflows
- Real-time bidding scenarios
- Admin functionality

### Manual Testing
1. Start services: `pnpm dev`
2. Login with test credentials
3. Navigate to live auction room
4. Place bids and verify real-time updates

## 📁 Project Structure

```
aiauction/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/           # App Router pages
│   │   │   ├── components/    # React components
│   │   │   ├── hooks/         # Custom hooks
│   │   │   └── lib/          # Utilities
│   │   ├── tailwind.config.js # Tailwind configuration
│   │   └── next.config.js     # Next.js configuration
│   └── server/                 # NestJS backend
│       ├── src/
│       │   ├── auth/          # Authentication module
│       │   ├── users/         # User management
│       │   ├── products/      # Product management
│       │   ├── auction-sessions/ # Auction logic
│       │   ├── bids/          # Bidding system
│       │   ├── socket/        # WebSocket handling
│       │   ├── prisma/        # Database service
│       │   └── redis/         # Caching service
│       └── prisma/
│           ├── schema.prisma  # Database schema
│           └── seed.ts        # Seed data
├── packages/
│   └── ui/                     # Shared package
│       └── src/
│           ├── types/         # TypeScript definitions
│           ├── components/    # Reusable components
│           └── utils/         # Helper functions
├── docker-compose.yml          # Dev services
├── pnpm-workspace.yaml        # Workspace config
└── README.md                  # This file
```

## 🚀 Production Deployment

### Build for Production
```bash
# Build all applications
pnpm build

# Start production servers
pnpm start
```

### Docker Production Setup
```dockerfile
# Use multi-stage builds
# Configure environment variables
# Set up proper networking
# Enable SSL/TLS
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- 📧 Email: support@aiauction.com
- 📖 Documentation: [Wiki](./docs)
- 🐛 Bug Reports: [Issues](./issues)
- 💬 Discussions: [Discussions](./discussions)

## 🏁 Next Steps

1. **Complete Real-time System:** Implement Socket.IO bidding and chat
2. **Build Admin Interface:** Create management dashboard
3. **Add Video Streaming:** Integrate HLS player with controls
4. **Implement Digital Human:** Add TTS and lip-sync providers
5. **Security Hardening:** Add comprehensive validation and rate limiting
6. **Testing Suite:** Comprehensive unit and E2E tests
7. **Performance Optimization:** Caching, CDN, database indexing
8. **Production Deployment:** CI/CD, monitoring, scaling

---

Built with ❤️ for the future of digital commerce
