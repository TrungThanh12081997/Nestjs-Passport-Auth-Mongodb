import { SetMetadata, applyDecorators } from '@nestjs/common';

export function IsPublic() {
  // typeOfContent: CircleTypeOfContent | OrganisationTypeOfContent,
  // typeOfAccess: TypeOfAccess,
  return applyDecorators(SetMetadata('typeOfContent', true));
}
