import { Inject, Injectable, Logger, NotFoundException, Scope, forwardRef } from '@nestjs/common';
import { BaseService } from '../../services/base.service';
import { UserDocument, UserEntity } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';

@Injectable({ scope: Scope.REQUEST })
export class UserService extends BaseService<UserEntity> {
  protected readonly logger = new Logger(UserService.name);

  constructor(
    @Inject(REQUEST) request: any,
    @InjectModel('users') private userModel: Model<UserDocument>,
  ) {
    super(userModel, request, UserEntity);
  }

  async getByEmail(username: string) {
    try {
      //   const userResult = await this.findOne({
      //     $or: [{ 'emails.address': username }, { username }],
      //     disabled: { $in: [false, null] },
      //   });
      const userResult = await this.userModel.findOne({
        $or: [{ 'emails.address': username }, { username }],
        disabled: { $in: [false, null] },
      });
      console.log('userResult', userResult);

      return userResult;
    } catch (error) {
      throw error instanceof NotFoundException ? new NotFoundException('User with this email does not exist') : error;
    }
  }
}
