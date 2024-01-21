// import { CreateEndpoint } from '@app/common/decorators/create-endpoint.decorator';
// import { GetEndpoint } from '@app/common/decorators/get-endpoint.decorator';
// import { User } from '@app/common/decorators/user.decorator';
// import { AuthService } from '@app/common/modules/auth/auth.service';
// import { AuthCredentialsDto } from '@app/common/modules/auth/dto/auth-credentials.dto';
// import { RefreshAuthDto } from '@app/common/modules/auth/dto/refresh-auth.dto';
// import { LocalAuthGuard } from '@app/common/modules/auth/guards/local-auth.guard';
// import { TokenModel } from '@app/common/modules/auth/model/token.model';
// import { ReadUserDto } from '@app/common/modules/user/dto/read-user.dto';
// import { UserEntity } from '@app/common/modules/user/schemas/user.schema';
// import { MapBody } from '@app/common/pipes/map-body.pipe';
import { BadRequestException, Controller, Get, HttpCode, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FastifyReply } from 'fastify';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CheckAccess } from '../access/decorators/check-access.decorator';

const SET_COOKIE_HEADER = 'Set-Cookie';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  @CheckAccess('roomRules', 'update_roles')
  login(
    @Request() req,
    @Response({ passthrough: true })
    res: FastifyReply,
  ) {
    const { user } = req;

    const cookieConfig = this.authService.getCookieWithJwtToken(user);

    res.header(SET_COOKIE_HEADER, cookieConfig);
    return { user };
  }

  // @IsPublic()
  // @Post('/logout')
  // @ApiOperation({ summary: 'Logout' })
  // async logout(@Response({ passthrough: true }) res: FastifyReply) {
  //   const cookieConfig = this.authService.revokeCookie();
  //   res.header(SET_COOKIE_HEADER, cookieConfig);

  //   return {
  //     msg: 'bye',
  //   };
  // }

  // @IsPublic()
  // @Post('/token')
  // @CreateEndpoint('Refresh authentication token', RefreshAuthDto, null, null)
  // async refreshToken(
  //   @MapBody(RefreshAuthDto, TokenModel) dto: TokenModel,
  //   @Response({ passthrough: true }) res: FastifyReply,
  // ) {
  //   try {
  //     const cookieConfig = await this.authService.refreshToken(dto);
  //     res.header(SET_COOKIE_HEADER, cookieConfig);
  //     return {
  //       message: 'ok',
  //     };
  //   } catch (error) {
  //     throw new BadRequestException();
  //   }
  // }

  // @SkipAccess()
  // @Get('me')
  // @GetEndpoint('Return current user data', ReadUserDto, UserEntity)
  // getProfile(@User() user, @Request() req) {
  //   return this.authService.handleCurrentUserProfile(user, req);
  // }
}
