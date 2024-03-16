import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { IAuth } from 'src/interfaces/auth.interface';
import { Request, Response, NextFunction } from 'express';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class verifyToken implements NestMiddleware {
  constructor(@InjectModel('user') private readonly authModel: Model<IAuth>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        req['user'] = await this.authModel
          .findById(decoded.id)
          .select('-password');

        next();
      } catch (error) {
        throw new HttpException('Not Authorized', 401);
      }
    }

    if (!token) throw new HttpException('Not Authorized, No Token', 401);
  }
}
