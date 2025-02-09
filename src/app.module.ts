import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/context/auth/infrastructure/auth.module';
import { AuthGuard } from '@/context/shared/guards/auth.guard';
import { ProductModules } from '@/context/product/infrastructure/product.module';
import { StockMovementModules } from '@/context/product/infrastructure/modules/stock-movement.module';

@Module({
  providers: [AuthGuard],
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    ProductModules,
    StockMovementModules,
    MongooseModule.forRoot(
      `mongodb+srv://todo:${process.env.KEY_MONGO}@cluster0.i8kuny3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    ),
  ],
})
export class AppModule {}
