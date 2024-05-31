// import { UserService } from '@app/common/modules/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { get } from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  _id: string;
  email: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private moduleRef: ModuleRef,
    private configService: ConfigService, // private readonly userService: UserService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request) => get(request.cookies, configService.get<string>('JWT_BEARER_NAME')) as string,
      // ]),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload) {
    const contextId = ContextIdFactory.getByRequest(request);
    // "AuthService" is a request-scoped provider
    // const userService = await this.moduleRef.resolve(UserService, contextId);
    try {
      // const user = await userService.findById(payload._id, {}, { lean: false });
      const user = {
        name: 'thanh',
        email: 'ok@gmail.com',
      };
      return user;
    } catch (error) {
      throw error instanceof NotFoundException ? new NotFoundException('User with this email does not exist') : error;
    }
  }
}
