// import { AuthService } from '@app/common/modules/auth/auth.service';
// import { UserEntity } from '@app/common/modules/user/schemas/user.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import randomId from '../utils/randomId';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private moduleRef: ModuleRef,
    @InjectModel('users') private userModel: Model<UserDocument>,
  ) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(request: Request, username: string, password: string) {
    const contextId = ContextIdFactory.getByRequest(request);
    // "AuthService" is a request-scoped provider
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    // const userCreate = await this.userModel.create({
    //   username: 'test1@test.com',
    //   password: '$2a$10$dsDU.ScbHt9K8bYpECIhQ.ikJ4Gpd.YD0DNJj0O7smmSVAoW7ktuq',
    // });
    // console.log('userCreate', userCreate);

    const user = await authService.validateUser(username, password);
    // this round is return user;
    // const user = {
    //   _id: randomId(),
    //   name: 'thanh',
    //   email: 'quantrungthanh79@gmail.com',
    // };
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('user 1', user);

    return user;
  }
}
