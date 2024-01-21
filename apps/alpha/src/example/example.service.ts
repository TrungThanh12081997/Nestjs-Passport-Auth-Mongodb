import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Example, ExampleDocument } from './schemas/example.schema';
import { BaseService } from '../../../../libs/common/src /services/base.service';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class ExampleService extends BaseService<Example> {
  protected readonly logger = new Logger(ExampleService.name);

  constructor(
    @Inject(REQUEST) request: any,

    private configService: ConfigService,
    @InjectModel(Example.name) private readonly exampleModel: Model<ExampleDocument>,
  ) {
    super(exampleModel, request, Example);
  }

  createCircle = async ({ circleId, name, email, user }) => {
    const exampleItems = await this.create({
      name: 'ok demo',
    });
    return {
      exampleItems,
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

  deleteCircle = async ({ circleId }) => {
    // update to disabled: true
    const exampleItems = await this.deleteById(circleId);
    return 'Delete ok';
  };
}
