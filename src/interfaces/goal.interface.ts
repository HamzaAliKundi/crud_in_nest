import { Types } from 'mongoose';

export interface IGoal {
  user: Types.ObjectId;
  goal: string;
}
