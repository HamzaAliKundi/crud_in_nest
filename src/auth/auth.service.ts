import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IAuth } from 'src/interfaces/auth.interface';
import { Injectable, HttpException } from '@nestjs/common';
import { generateToken } from 'src/utils/jwt.generateToken';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private readonly authModel: Model<IAuth>) {}

  public async registerUser(user: IAuth) {
    const { name, email, password } = user;
    if (!name || !email || !password)
      throw new HttpException('All fields are required : ', 400);

    const userExists = await this.authModel.findOne({ email });
    if (userExists)
      throw new HttpException(
        'User already exists with this email address : ',
        400,
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { name, email, password: hashedPassword };
    const newUserCreated: any = await this.authModel.create(newUser);

    if (newUserCreated) {
      const user = {
        id: newUserCreated._id,
        token: generateToken(newUserCreated._id),
      };
      return user;
    }

    throw new HttpException('Something went wrong', 500);
  }

  public async loginUser(user: IAuth) {
    const { email, password } = user;

    if (!email || !password)
      throw new HttpException('All fields are required', 400);
    const userExists = await this.authModel.findOne({ email });
    if (!userExists)
      throw new HttpException('user this email email address not found ', 400);

    if (email && (await bcrypt.compare(password, userExists.password))) {
      const user = {
        id: userExists._id,
        token: generateToken(userExists._id as Types.ObjectId),
      };
      return user;
    } else {
      throw new HttpException('Invalid credientals ', 400);
    }
  }
}
