import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { IGoal } from 'src/interfaces/goal.interface';

@Controller('goal')
export class GoalController {
  constructor(private goalService: GoalService) {}

  @Get()
  async getGoals(@Req() req: any) {
    const userId = req.user._id;
    return this.goalService.getGoals(userId);
  }

  @Post()
  async addGoal(@Body() goal: IGoal, @Req() req: any) {
    const userId = req.user._id;
    goal.user = userId;
    return this.goalService.addGoal(goal);
  }

  @Delete(':id')
  async deleteGoal(@Param('id') id: string) {
    return this.goalService.deleteGoal(id);
  }

  @Put(':id')
  async updatGoal(@Body() goal: IGoal, @Param('id') id: string) {
    const obj = { goal, goalId: id };
    return this.goalService.updateGoal(obj);
  }
}
