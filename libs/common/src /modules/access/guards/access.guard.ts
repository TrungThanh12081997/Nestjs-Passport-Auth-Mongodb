import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_TYPES, CIRCLE_CONTENT_TYPES, ORGANISATION_CONTENT_TYPES } from '../access.const';

type OrganisationTypeOfContent = (typeof ORGANISATION_CONTENT_TYPES)[number];
type CircleTypeOfContent = (typeof CIRCLE_CONTENT_TYPES)[number];
type TypeOfAccess = (typeof ACCESS_TYPES)[number];

/**
 * Check if user has admin access to specific endpoint
 * Above endpoint methods add 'typeOfContent' and 'typeOfAccess' with SetMetadata decorator, example:
 * @SetMetadata('typeOfContent', 'orgRules')
 * @SetMetadata('typeOfAccess', 'read')
 */
@Injectable({ scope: Scope.REQUEST })
export class AccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const typeOfContent = this.reflector.get('typeOfContent', context.getHandler());
    if (typeOfContent) return true;
    return false;
  }
}
