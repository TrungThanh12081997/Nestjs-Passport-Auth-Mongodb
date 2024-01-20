import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ExampleService } from './example.service';
import { getCircleQuery } from './query/getCircleQuery.dto';
import { CreateCircleDto } from './dto/create/createBody.dto';
import { CheckAccess } from '../../../../libs/common/src /modules/access/decorators/check-access.decorator';
import { AccessGuard } from '../../../../libs/common/src /modules/access/guards/access.guard';
import { User } from '../../../../libs/common/src /decorators/user.decorator';
import { IsPublic } from '../../../../libs/common/src /modules/access/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('example')
@Controller('example')
export class ExemplaeController {
  constructor(
    private readonly exampleService: ExampleService,
    // private readonly timelineService: TimelineService,
  ) {}

  @HttpCode(200)
  @Post('create/:id/:targetUserId')
  @IsPublic()
  @CheckAccess('roomRules', 'update_roles')
  async createCircle(
    @User() user: any,
    @Param('id') circleId: string,
    // @Param('targetUserId') targetUserId: string,
    @Body() body: CreateCircleDto,
  ) {
    return this.exampleService.createCircle({ ...body, user, circleId });
  }

  @Put('update/:id/:targetUserId')
  // @CheckAccess('roomRules', 'update_roles')
  async updateStaff(
    // @User() user: UserEntity,
    @Param('id') circleId: string,
    @Param('targetUserId') targetUserId: string,
    @Body() body: CreateCircleDto, // create a dto for update
  ) {
    return this.exampleService.updateCircle({ ...body, circleId, targetUserId });
  }

  @Get('/:id')
  //   @CheckAccess('roomOrganisations', 'read')
  async getCircleById(
    // @User() user: UserEntity, TODO: Thanh, get @User
    @Query() query: getCircleQuery,
    @Param('id') circleId: string,
  ) {
    try {
      return this.exampleService.getCircleById({ ...query, circleId });
    } catch (error) {
      return error?.message;
    }
  }

  @Delete('delete/:id')
  // @CheckAccess('roomRules', 'remove')
  async deleteStaff(
    // @User() user: UserEntity,
    @Param('id') circleId: string,
  ) {
    return this.exampleService.deleteCircle({ circleId });
  }
}
