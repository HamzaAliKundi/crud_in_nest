import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GoalModule } from './goal/goal.module';
import { authSchema } from './models/auth.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsModule } from './utils/utils.module';
import { verifyToken } from './middlewares/auth.middleware';
import { ErrorMiddleware } from './middlewares/errorHandler.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: authSchema,
      },
    ]),
    AuthModule,
    GoalModule,
    UtilsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorMiddleware,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(verifyToken)
      .forRoutes({ path: 'goal/', method: RequestMethod.ALL });
  }
}
