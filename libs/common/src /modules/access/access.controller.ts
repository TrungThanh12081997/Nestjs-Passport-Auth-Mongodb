// import { CreateEndpoint } from '@app/common/decorators/create-endpoint.decorator';
// import { SkipAccess } from '@app/common/decorators/skip-access.decorator';
// import { User } from '@app/common/decorators/user.decorator';
// import { AccessService } from '@app/common/modules/access/access.service';
// import { AuthCircleDto } from '@app/common/modules/access/dto/auth-circle.dto';
// import { AuthOrganisationModel } from '@app/common/modules/access/schemas/authOganisation.model';
// import { MapBody } from '@app/common/pipes/map-body.pipe';
// import { Controller, Post } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessService } from './access.service';

// import { AuthOrganisationDto } from './dto/auth-organisation.dto';

@ApiTags('access')
@Controller('access')
// @SkipAccess()
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  // @Post('organisation')
  // @CreateEndpoint('checkOrganisationAccess', AuthOrganisationDto, null, null)
  // checkOrganisationAccess(
  //   @User() user,
  //   @MapBody(AuthOrganisationDto, AuthOrganisationModel) model: AuthOrganisationModel,
  // ) {
  //   return this.accessService.checkOrganisationAccess(user, model);
  // }

  @Post('circle')
  checkCircleAccess(
    // @User() user,
    // @MapBody(AuthCircleDto, AuthOrganisationModel) dto: AuthOrganisationModel,
    @Body() dto: any,
  ) {
    return this.accessService.checkCircleAccess({
      // user,
      ...dto,
    });
  }
}
