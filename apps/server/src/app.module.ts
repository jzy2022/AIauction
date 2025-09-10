import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';

import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuctionSessionsModule } from './auction-sessions/auction-sessions.module';
import { BidsModule } from './bids/bids.module';
import { OrdersModule } from './orders/orders.module';
import { SocketModule } from './socket/socket.module';
import { DigitalHumanModule } from './digital-human/digital-human.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'fallback-secret',
      signOptions: { expiresIn: '24h' },
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute
    }]),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    AuctionSessionsModule,
    BidsModule,
    OrdersModule,
    SocketModule,
    DigitalHumanModule,
  ],
})
export class AppModule {}