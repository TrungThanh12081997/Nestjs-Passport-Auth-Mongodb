import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ACCESS_TYPES, CIRCLE_CONTENT_TYPES, ORGANISATION_CONTENT_TYPES } from '../access.const';

type OrganisationTypeOfContent = (typeof ORGANISATION_CONTENT_TYPES)[number];
type CircleTypeOfContent = (typeof CIRCLE_CONTENT_TYPES)[number];
type TypeOfAccess = (typeof ACCESS_TYPES)[number];

// eslint-disable-next-line func-style
export function CheckAccess(
  typeOfContent: CircleTypeOfContent | OrganisationTypeOfContent,
  typeOfAccess: TypeOfAccess,
) {
  return applyDecorators(SetMetadata('typeOfContent', typeOfContent), SetMetadata('typeOfAccess', typeOfAccess));
}
