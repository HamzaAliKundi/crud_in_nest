import { Model, ObjectId } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IGoal } from 'src/interfaces/goal.interface';

@Injectable()
export class GoalService {
  constructor(@InjectModel('goal') private readonly goalModel: Model<IGoal>) {}

  public async getGoals(userId: ObjectId) {
    const goals = await this.goalModel
      .find({ user: userId })
      .populate('user', 'name');
    return goals;
  }

  public async addGoal(goal: IGoal) {
    const newGoal = new this.goalModel(goal);
    return newGoal.save();
  }

  public async deleteGoal(id: string) {
    const deleteGoal = await this.goalModel.findByIdAndDelete({ _id: id });
    if (!deleteGoal) throw new HttpException('Goal not found : ', 404);

    return deleteGoal;
  }

  public async updateGoal(goal: any) {
    const updateGoal = await this.goalModel.findByIdAndUpdate(
      { _id: goal.goalId },
      goal.goal,
      { new: true },
    );
    if (!updateGoal) throw new HttpException('Goal not found ', 404);

    return updateGoal;
  }
}
