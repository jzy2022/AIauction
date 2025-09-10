# Digital Human Auction - MVP Backend

A minimal, production-leaning auction engine skeleton for real-time bidding with anti-sniping extension. Built with Node.js, TypeScript, Express, and Socket.IO.

## Features (MVP)
- Create auctions (English auction)
- Place bids with min increment validation
- Real-time bid updates via WebSocket rooms
- Anti-sniping (auto-extend when a bid arrives near the end)
- In-memory storage (swap with Postgres/Redis later)

## Requirements
- Node 18+
- pnpm or npm

## Run (development)
```bash
cd backend
pnpm install
pnpm dev
# or with npm:
# npm install
# npm run dev
```

Server: http://localhost:4000  
WS path: /ws

## REST (dev)
- POST /auctions
- GET /auctions/:id
- POST /auctions/:id/bids

Example payloads

- Create auction:
```json
{
  "title": "AI Digital Human #1",
  "assetId": "dh_001",
  "startPrice": 100,
  "minIncrement": 10,
  "startAt": 1735707600000,
  "endAt": 1735711200000,
  "antiSnipingSecs": 60
}
```

- Place bid:
```json
{
  "userId": "user_123",
  "amount": 120
}
```

## WebSocket (Socket.IO)
- Connect to ws at path `/ws`
- Join room with event: `join_auction` and the auctionId
- Server emits:
  - `auction_snapshot` { auction, bids }
  - `bid_placed` { bid, auction }
  - `auction_updated` auction

## Next steps
- Replace in-memory stores with Postgres + Redis (locks, TTL, leader election)
- Add auth (JWT), KYC checks, deposits, and rate limiting
- Persist audit logs and domain events
- Integrate payments (sandbox)
- Add admin review for digital humans
