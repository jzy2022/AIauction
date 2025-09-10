import { PrismaClient, UserRole, AuctionStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPasswordHash = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aiauction.com' },
    update: {},
    create: {
      email: 'admin@aiauction.com',
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
      displayName: 'System Admin',
    },
  });

  console.log(`👤 Created admin user: ${admin.email}`);

  // Create bidder user
  const bidderPasswordHash = await bcrypt.hash('bidder123', 12);
  const bidder = await prisma.user.upsert({
    where: { email: 'bidder@example.com' },
    update: {},
    create: {
      email: 'bidder@example.com',
      passwordHash: bidderPasswordHash,
      role: UserRole.BIDDER,
      displayName: 'John Bidder',
    },
  });

  console.log(`👤 Created bidder user: ${bidder.email}`);

  // Create products
  const product1 = await prisma.product.upsert({
    where: { id: 'prod-1' },
    update: {},
    create: {
      id: 'prod-1',
      title: 'AI Digital Human Avatar #001',
      description: 'Premium digital human with advanced AI capabilities. Features realistic facial expressions, natural voice synthesis, and intelligent conversation abilities.',
      images: ['https://via.placeholder.com/400x300?text=Digital+Human+001'],
      startingPrice: 1000,
      incrementStep: 50,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { id: 'prod-2' },
    update: {},
    create: {
      id: 'prod-2',
      title: 'AI Digital Human Avatar #002',
      description: 'Custom digital human with specialized knowledge in finance and business. Perfect for virtual assistants and customer service applications.',
      images: ['https://via.placeholder.com/400x300?text=Digital+Human+002'],
      startingPrice: 1500,
      incrementStep: 100,
    },
  });

  console.log(`📦 Created products: ${product1.title}, ${product2.title}`);

  // Create auction sessions
  const now = new Date();
  const futureStart = new Date(now.getTime() + 2 * 60 * 1000); // 2 minutes from now
  const futureEnd = new Date(now.getTime() + 32 * 60 * 1000); // 32 minutes from now
  
  const scheduledSession = await prisma.auctionSession.upsert({
    where: { id: 'session-1' },
    update: {},
    create: {
      id: 'session-1',
      productId: product1.id,
      status: AuctionStatus.SCHEDULED,
      startTime: futureStart,
      endTimePlanned: futureEnd,
      currentPrice: product1.startingPrice,
      createdById: admin.id,
    },
  });

  // Create a live session for immediate testing
  const liveStart = new Date(now.getTime() - 5 * 60 * 1000); // started 5 minutes ago
  const liveEnd = new Date(now.getTime() + 25 * 60 * 1000); // ends in 25 minutes
  
  const liveSession = await prisma.auctionSession.upsert({
    where: { id: 'session-2' },
    update: {},
    create: {
      id: 'session-2',
      productId: product2.id,
      status: AuctionStatus.LIVE,
      startTime: liveStart,
      endTimePlanned: liveEnd,
      currentPrice: product2.startingPrice,
      createdById: admin.id,
    },
  });

  console.log(`🏆 Created auction sessions: ${scheduledSession.id} (${scheduledSession.status}), ${liveSession.id} (${liveSession.status})`);

  // Create some sample bids for the live session
  const bid1 = await prisma.bid.create({
    data: {
      sessionId: liveSession.id,
      userId: bidder.id,
      amount: liveSession.currentPrice + product2.incrementStep,
      isLeading: false,
    },
  });

  const bid2 = await prisma.bid.create({
    data: {
      sessionId: liveSession.id,
      userId: bidder.id,
      amount: bid1.amount + product2.incrementStep,
      isLeading: true,
    },
  });

  // Update the session with the leading bid
  await prisma.auctionSession.update({
    where: { id: liveSession.id },
    data: {
      currentPrice: bid2.amount,
      leadingBidId: bid2.id,
    },
  });

  console.log(`💰 Created sample bids for live session`);

  console.log('✅ Seeding completed!');
  console.log(`
📋 Test credentials:
- Admin: admin@aiauction.com / admin123
- Bidder: bidder@example.com / bidder123

🔗 Live session ID: ${liveSession.id}
  `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });