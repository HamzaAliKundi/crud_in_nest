import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { authSchema } from '../models/auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: authSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
