// import { CirclesService } from '@app/alpha/circles/circles.service';
// import { getAllUserRolesInRoom } from '@app/alpha/circles/circles.utils';
// import { UpdateCircleInformalMembersAccessesPropInputEntity } from '@app/alpha/circles/dtos/update/members/updateCircleInformalMembersAccessesInput.entity';
// import { UpdateCircleOrgMembersAccessesPropInputEntity } from '@app/alpha/circles/dtos/update/orgMembers/updateCircleOrgMembersAccessesInput.entity';
// import { CircleDocument, CircleEntity } from '@app/alpha/circles/schemas/circle.schema';
// import { OrganisationService } from '@app/alpha/organisation/organisation.service';
// import { AggregateCircleData, GetMembers } from '@app/common/modules/access/access.types';
// import { AuthCircleDto } from '@app/common/modules/access/dto/auth-circle.dto';
// import { AuthOrganisationDto } from '@app/common/modules/access/dto/auth-organisation.dto';
// import { AccessDocument, AccessEntity } from '@app/common/modules/access/schemas/access.schema';
// import { UserService } from '@app/common/modules/user/user.service';
// import { BaseService } from '@app/common/services/base.service';
// import { createGenericCollection } from '@app/common/utils/genericMongo.util';
// import { ForbiddenException, forwardRef, Inject, Injectable, Logger, Scope } from '@nestjs/common';
// import { REQUEST } from '@nestjs/core';
// import { InjectModel } from '@nestjs/mongoose';
import {
  compact,
  concat,
  difference,
  filter,
  findIndex,
  flatMap,
  flatten,
  flow,
  forEach,
  get,
  includes,
  intersection,
  isArray,
  isEmpty,
  isEqual,
  isObject,
  isString,
  keys,
  map,
  pickBy,
  reduce,
  reject,
  uniq,
  uniqWith,
} from 'lodash';
// import { Model } from 'mongoose';

import { ForbiddenException, Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthCircleDto } from './dto/auth-circle.dto';

// import { UserDocument, UserEntity } from '../user/schemas/user.schema';
// import {
//   ACCESS_CONTENT_TYPES,
//   CIRCLE_CONTENT_TYPES,
//   DEFAULT_RULES,
//   INFORMAL_USER_ACTIONS,
//   INFORMAL_USER_ROLES,
//   ORG_USER_ROLES,
//   ORGANISATION_CONTENT_TYPES,
// } from './access.const';

@Injectable({ scope: Scope.REQUEST })
// extends BaseService<AccessEntity>
export class AccessService {
  protected readonly logger = new Logger(AccessService.name);

  constructor(
    @Inject(REQUEST) request: any,
    // @InjectModel(AccessEntity.name) private accessModel: Model<AccessDocument>,
    // @InjectModel('users') private userModel: Model<UserDocument>,
    // @InjectModel(CircleEntity.name) private circleModel: Model<CircleDocument>,
    // @Inject(forwardRef(() => CirclesService)) private readonly circleService: CirclesService,
    // @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    // @Inject(forwardRef(() => OrganisationService)) private readonly organisationService: OrganisationService,
  ) {
    // super();
    // super(accessModel, request, AccessEntity);
  }

  async checkCircleAccess(
    // user: UserEntity,
    model: AuthCircleDto,
    url?: string,
    isCircleDocument?: boolean,
    docOrganisationId?: string,
  ) {
    const user = {
      _id: 'abc',
      name: 'okname',
      organisationId: 'org1',
      active: false,
    }; // demo user
    const { circleId, typeOfContent, typeOfAccess, ownerOrganisationId } = model;
    if (!user?.active) {
      throw new ForbiddenException('user is not active');
    }
    // const activeOrganisation = user?.organisationId;
    // // const circle = await this.circleModel.findOne({ _id: circleId }).lean(true);
    // const { inactiveOrganisationsIds = [] } = circle || {};
    // const isOrgInactive = includes(inactiveOrganisationsIds, activeOrganisation);
    // const isToActiveOrgApi = url && includes(url, 'org-to-active');
    // const isSkipCheckInactive = includes(typeOfAccess, 'read');

    // if (isOrgInactive && !isToActiveOrgApi && !isSkipCheckInactive) {
    //   throw new ForbiddenException(
    //     'Circle is Inactive, your organisation cannot work (create records), nor have access to the personal information of the client created by other organisations.',
    //   );
    // }

    // const adminAccess = this.checkAdminAccess(user, typeOfAccess, typeOfContent);
    // if (adminAccess) return adminAccess;

    // if (!includes(CIRCLE_CONTENT_TYPES, typeOfContent)) throw new ForbiddenException();

    // const isCirclePersonalMember = user.isPersonalMemberOfCircle(circleId);
    // const isCircleMember = user.isMemberOfCircle(circleId);
    // if (!isCircleMember && !isCirclePersonalMember) throw new ForbiddenException();

    // const query = [{ typesOfAccess: typeOfAccess }, { typeOfContent }, { roomId: circleId }];

    // // Get document's owner
    // if (ownerOrganisationId) {
    //   // @ts-ignore
    //   query.push({ ownerId: { $in: [ownerOrganisationId] } });
    // }
    // // Get user's role on Circle
    // const userRoles = user.getRolesIn(circleId);
    // // If user is informal(circle's personal) role
    // if (isCirclePersonalMember) {
    //   // @ts-ignore
    //   query.push({ userRole: { $in: userRoles }, organisationId: null });
    // }

    // // If user is organisation's role
    // if (isCircleMember) {
    //   // const { id: activeOrganisation } = await this.userService.getActiveOrganisation(user._id);
    //   // @ts-ignore
    //   query.push({ userRole: { $in: userRoles }, organisationId: activeOrganisation });
    // }

    // // If checking circle document
    // if (isCircleDocument) {
    //   const queryOwnerId = (typeOfAccess === 'create' ? activeOrganisation : docOrganisationId) || null;
    //   query.push({
    //     // @ts-ignore
    //     userRole: { $in: userRoles },
    //     organisationId: activeOrganisation,
    //     ownerId: { $in: [queryOwnerId] },
    //   });
    // }

    // // Check Access permissions query
    // const accessObj = await this.accessModel.findOne({ $and: query }, { ownerStatus: 1 }).lean(true);

    return {
      // access: get(accessObj, 'ownerStatus') === 'active',
      access: true,
      typeOfAccess,
      typeOfContent,
    };
  }
}
