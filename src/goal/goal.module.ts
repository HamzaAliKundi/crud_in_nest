import { Module } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { MongooseModule } from '@nestjs/mongoose';
import { goalSchema } from '../models/goal.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'goal',
        schema: goalSchema,
      },
    ]),
  ],
  controllers: [GoalController],
  providers: [GoalService],
})
export class GoalModule {}
