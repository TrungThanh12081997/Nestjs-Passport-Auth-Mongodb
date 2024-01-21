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
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @HttpCode(200)
  @Post('create/:id/:targetUserId')
  @IsPublic()
  @CheckAccess('roomRules', 'update_roles')
  async createCircle(@User() user: any, @Param('id') circleId: string, @Body() body: CreateCircleDto) {
    return this.exampleService.createCircle({ ...body, user, circleId });
  }

  @Put('update/:id/:targetUserId')
  async updateStaff(
    @Param('id') circleId: string,
    @Param('targetUserId') targetUserId: string,
    @Body() body: CreateCircleDto,
  ) {
    return this.exampleService.updateCircle({ ...body, circleId, targetUserId });
  }

  @Get('/:id')
  @IsPublic()
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
  async deleteStaff(@Param('id') circleId: string) {
    return this.exampleService.deleteCircle({ circleId });
  }
}
