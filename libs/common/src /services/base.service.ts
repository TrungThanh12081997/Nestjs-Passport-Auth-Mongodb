// import { UserEntity } from '@app/common/modules/user/schemas/user.schema';
import { Logger, NotFoundException } from '@nestjs/common';
import { assign, isEmpty, map } from 'lodash';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { HistoryAction, HistoryBaseEntity } from '../schemas/historyBase.schema';
import randomId from '../modules/auth/utils/randomId';

const getParentClassName = (TargetClass: any): string => Object.getPrototypeOf(new TargetClass().constructor).name;

const shouldHaveHistory = (baseEntity): boolean => {
  const parentClassName = getParentClassName(baseEntity);
  return parentClassName === HistoryBaseEntity.name;
};

export abstract class BaseService<T extends HistoryBaseEntity> {
  protected abstract readonly logger: Logger;

  protected haveHistory = false;

  protected userId;

  constructor(
    protected readonly BaseModel: Model<any & T>,
    protected readonly request: { user: any },
    protected readonly baseEntity: any,
  ) {
    if (baseEntity) this.haveHistory = shouldHaveHistory(baseEntity);
    this.userId = this.request?.user?._id;
  }

  parse(entity): T {
    return entity.toJSON() as T;
  }

  async getHistory(id: string) {
    const calledId = randomId();
    this.logger.log({ calledId, id }, '.getHistory called');
    const entity = await this.findById(id);

    return entity.history || [];
  }

  async findById(
    id: string,
    projection?: any | null,
    options?: (QueryOptions & { suppressNotFound?: boolean }) | null,
  ): Promise<Partial<T>> {
    const calledId = randomId();
    this.logger.log({ calledId, id }, '.findById called');
    return this.findOne({ _id: id, disabled: { $in: [false, null] } }, projection, options);
  }

  async nativeFindOne(
    filter: FilterQuery<T & any>,
    projection?: any | null,
    options?: (QueryOptions & { suppressNotFound?: boolean }) | null,
  ) {
    const defaultOptions = { lean: true };
    const defaultProjection = { 'history.previousData': 0 };
    const queryProjection = isEmpty(projection) ? defaultProjection : projection;
    const queryOptions = assign(defaultOptions, options || {});
    const calledId = randomId();
    try {
      const result = await this.BaseModel.findOne(filter, queryProjection, queryOptions).exec();
      this.logger.log({ calledId, filter, projection, options }, '.findOne found result');
      return result;
    } catch (error) {
      this.logger.warn({ error, calledId, filter, projection, options }, '.findOne thrown error!');
      throw error;
    }
  }

  async findOne(
    filter: FilterQuery<T & any>,
    projection?: any | null,
    options?: (QueryOptions & { suppressNotFound?: boolean }) | null,
  ): Promise<T> {
    const defaultProjection = { 'history.previousData': 0 };
    const queryProjection = isEmpty(projection) ? defaultProjection : projection;

    const defaultOptions = { lean: true };
    const queryOptions = assign(defaultOptions, options || {});

    const calledId = randomId();
    this.logger.log({ calledId, filter, projection, options }, '.findOne called');

    let result;

    try {
      console.log('filter1', filter);
      console.log('queryProjection1', queryProjection);
      console.log('queryOptions1', queryOptions);

      result = await this.BaseModel.findOne(
        filter,
        // queryProjection, queryOptions
      ).exec();
      console.log('resultFindOne', result);

      if (queryOptions.suppressNotFound) return result;

      if (!result) {
        throw new NotFoundException();
      }
    } catch (error) {
      this.logger.warn({ error, calledId, filter, projection, options }, '.findOne thrown error!');
      throw error;
    }

    this.logger.log({ calledId, filter, projection, options }, '.findOne found result');
    console.log('resultFindOne', result);

    return result;
  }

  async findMany(
    filter: FilterQuery<T & any>,
    projection: any | null = { 'history.previousData': 0 },
    options?: (QueryOptions & { suppressNotFound?: boolean }) | null,
  ): Promise<Array<T> | null> {
    const calledId = randomId();
    this.logger.log({ calledId, filter, projection, options }, '.findMany called');

    const defaultOptions = { lean: true };
    const queryOptions = assign(defaultOptions, options || {});

    const result = await this.BaseModel.find(
      filter || { disabled: { $in: [false, null] } },
      projection || { 'history.previousData': 0 },
      queryOptions,
    ).exec();

    this.logger.log({ calledId, ids: map(result, '_id') }, '.findMany found result');
    return result;
  }

  async create(entity: Partial<T>): Promise<T> {
    const calledId = randomId();

    this.logger.log({ calledId, entity }, '.create called');
    const newEntity = await new this.BaseModel({
      ...entity,
      ...(this.haveHistory
        ? {
            history: [
              {
                action: HistoryAction.CREATE,
                date: new Date(),
                previousData: null,
                userId: this.userId || this.request?.user?._id,
              },
            ],
          }
        : {}),
    }).save();
    this.logger.log({ calledId, id: newEntity.id }, '.create success');
    return this.parse(newEntity);
  }

  async findManyByIds(ids: string[], projection?: any | null, options?: QueryOptions | null): Promise<Array<T> | null> {
    const calledId = randomId();
    this.logger.log({ calledId, ids, projection, options }, '.findManyByIds called');

    return this.findMany({ _id: ids, disabled: { $in: [false, null] } }, projection, options);
  }

  updateById(id: string, entity: Partial<T>): Promise<T> {
    const calledId = randomId();
    this.logger.log({ calledId, id, entity }, '.updateById called');
    return this.update({ _id: id, disabled: { $in: [false, null] } }, entity);
  }

  async update(filter: FilterQuery<T & any>, entity: Partial<T>): Promise<T> {
    const calledId = randomId();
    this.logger.log({ calledId, filter, entity }, '.update called');

    let result;
    try {
      const oldEntity = await this.findOne(filter);

      if (!oldEntity) {
        throw new NotFoundException();
      }

      const updatePayload = {
        $set: entity,
      };

      if (this.haveHistory) {
        const history = {
          action: HistoryAction.UPDATE,
          date: new Date(),
          previousData: oldEntity,
          userId: this.userId || this.request?.user?._id,
        };
        // eslint-disable-next-line lodash-fp/no-unused-result
        assign(updatePayload, { $push: { history } });
      }

      result = await this.BaseModel.findOneAndUpdate(filter, updatePayload, { new: true }).lean().exec();
    } catch (error) {
      this.logger.warn({ error, calledId }, '.update thrown error!');
      throw error;
    }

    this.logger.log({ calledId }, '.updateById success');
    return result;
  }

  async getNewHistory(filter: FilterQuery<T & any>): Promise<T> {
    const calledId = randomId();
    this.logger.log({ calledId, filter }, '.getNewHistory called');

    let result;
    try {
      const oldEntity = await this.findOne(filter);

      if (!oldEntity) {
        throw new NotFoundException();
      }

      if (this.haveHistory) {
        const history = {
          action: HistoryAction.UPDATE,
          date: new Date(),
          previousData: oldEntity,
          userId: this.userId || this.request?.user?._id,
        };
        // eslint-disable-next-line lodash-fp/no-unused-result
        result = [...(oldEntity.history || []), history];
      }
    } catch (error) {
      this.logger.warn({ error, calledId }, '.getNewHistory thrown error!');
      throw error;
    }
    return result;
  }

  async deleteById(id: string) {
    const calledId = randomId();
    this.logger.log({ calledId, id }, '.delete called');

    return this.deleteOne({ _id: id, disabled: { $in: [false, null] } });
  }

  async deleteOne(filter: FilterQuery<T & any>): Promise<T> {
    const calledId = randomId();
    this.logger.log({ calledId, filter }, '.delete called');
    let result;

    try {
      const oldEntity = await this.findOne(filter, { history: 0 });

      const updatePayload = {
        $set: { disabled: true, lastModifiedBy: this.userId },
      };
      if (this.haveHistory) {
        const history = {
          action: HistoryAction.DELETE,
          date: new Date(),
          previousData: oldEntity,
          userId: this.userId,
        };
        // eslint-disable-next-line lodash-fp/no-unused-result
        assign(updatePayload, { $push: { history } });
      }

      result = await this.BaseModel.updateOne(filter, updatePayload).lean().exec();
    } catch (error) {
      this.logger.warn({ error, calledId }, '.delete thrown error!');
      throw error;
    }

    this.logger.log({ calledId }, '.delete success');

    return result;
  }

  async deleteMany(filter: FilterQuery<T & any>): Promise<any> {
    const calledId = randomId();
    this.logger.log({ calledId, filter }, '.deleteMany called');

    const updatePayload = { disabled: true, lastModifiedBy: this.userId };
    return this.BaseModel.updateMany(filter, updatePayload).exec();
  }

  async updateByQuery(filter: FilterQuery<T & any>, options: QueryOptions, getNew?: boolean) {
    await this.findOne(filter);
    return this.BaseModel.findByIdAndUpdate(filter, options, { ...(getNew ? { new: true } : {}) });
  }

  async findOneAndUpdateByQuery(filter: FilterQuery<T & any>, options: QueryOptions, getNew?: boolean) {
    return this.BaseModel.findOneAndUpdate(filter, options, { ...(getNew ? { new: true } : {}) })
      .lean()
      .exec();
  }
}
