import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ExampleService {
  constructor(
    private configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  createCircle = ({ circleId, name, email, user }) => {
    const someValue = this.configService.get<string>('EXAMPLE');
    console.log('someValue', someValue);
    return {
      // circleId,
      someValue,
      // name,
      // email,
      // user,
    };
  };

  updateCircle = ({ circleId, targetUserId, name, email }) => {
    // const typeOfContent = this.reflector.get('isPublic', context.getHandler());

    return {
      circleId,
      targetUserId,
      name,
      email,
    };
  };

  getCircleById = ({ circleId, organisationId, disabled }) => {
    return { ok: 'test api successfully', circleId, organisationId, disabled };
  };

  deleteCircle = ({ circleId }) => {
    // update to disabled: true
    return { circleId };
  };
}
