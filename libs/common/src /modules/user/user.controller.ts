import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from './schemas/user.schema';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // @Get('/')
  // @SkipAccess()
  // @GetEndpoint('Get current logged in user', LoggedInUserDto, LoggedInUserEntity)
  // async getLoggedInUser(): Promise<Partial<LoggedInUserEntity>> {
  //   return this.usersService.getLoginUser();
  // }

  // @Put('/')
  // @SkipAccess()
  // @UpdateEndpoint('Update user', UpdateOrgStaffInputDto, UpdateOrgStaffOutputDto, UpdateOrgStaffOutputEntity)
  // async updateMember(@MapBody(UpdateOrgStaffInputDto, UpdateOrgStaffInputEntity) entity: UpdateOrgStaffInputEntity) {
  //   return this.usersService.updateUserProfile(entity);
  // }

  // @SkipAccess()
  // @Get('/menu-items/find')
  // @ListEndpoint('Return menu items of the user', ReadOrganisationMenuItemsDto, ReadOrganisationMenuItemsEntity)
  // async fetchMenuItems() {
  //   return this.usersService.fetchMenuItems();
  // }

  // @SkipAccess()
  // @Get('my-orgs/find')
  // @ListEndpoint('Return user organisations', ReadMyOrganisationsDto, ReadMyOrganisationsEntity)
  // async fetchMyOrganisations() {
  //   return this.usersService.fetchMyOrganisations();
  // }

  // @Get('/profile')
  // @ListEndpoint('Return users profile and avatar', ReadUserDto, UserEntity)
  // @SkipAccess()
  // async getUsersInfo(@Query('ids') ids: string[]): Promise<Partial<UserEntity[]>> {
  //   return this.usersService.getUsersInfo(ids);
  // }

  // @Get('/avatars')
  // @ListEndpoint('Return avatars of provided user ids', GetUserAvatarDto, GetUserAvatarEntity)
  // @SkipAccess()
  // async getUserAvatars(@Query('ids') ids: string[]): Promise<GetUserAvatarEntity[]> {
  //   return this.usersService.getUserAvatars(ids);
  // }

  // @Get('/org-active')
  // @GetEndpoint('Get user active organisation id', ActiveOrganisationDto, ActiveOrganisationEntity)
  // @SkipAccess()
  // async getActiveOrganisation(@User() user: UserEntity): Promise<Partial<ActiveOrganisationEntity>> {
  //   return this.usersService.getActiveOrganisation(user._id);
  // }

  // // Used @GetEndpoint() in place of UpdateEndpoint(), because we don't want body in this API
  // @SkipAccess()
  // @Put('/org-active/:id')
  // @GetEndpoint('Update user active organisation', UpdateActiveOrganisationDto, UpdateActiveOrganisationEntity)
  // async updateActiveOrganisation(@User() user: UserEntity, @Param('id') id: string) {
  //   return this.usersService.updateUserActiveOrganisation(user._id, id);
  // }

  // @Get('/email')
  // @SkipAccess()
  // @GetEndpoint(
  //   'Return user of provided email with org id',
  //   SearchOrgMemberByEmailOutputDto,
  //   SearchOrgMemberByEmailOutputEntity,
  // )
  // async searchOrgMemberByEmail(
  //   @Query('email') email: string,
  //   @Query('organisationId') organisationId: string,
  // ): Promise<Partial<SearchOrgMemberByEmailOutputEntity>> | null {
  //   return this.usersService.searchOrgMemberByEmail(email, organisationId);
  // }
}
