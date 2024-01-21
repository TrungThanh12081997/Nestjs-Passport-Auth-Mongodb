// import { RefreshAuthDto } from '@app/common/modules/auth/dto/refresh-auth.dto';
// import { JwtPayload } from '@app/common/modules/auth/interface/jwt-payload.interface';
// import { generateAuthCookie, hashLoginToken, validatePassword } from '@app/common/modules/auth/utils/auth.util';
// import { UserEntity } from '@app/common/modules/user/schemas/user.schema';
// import { UserService } from '@app/common/modules/user/user.service';
// import { extractHostname } from '@app/common/utils/extractHostname.util';
// import { transformToRawJson } from '@app/common/utils/transformToRawJson.util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { assign, toLower } from 'lodash';
import { UserEntity } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { validatePassword } from './utils/auth.util';

// import { FileService } from '../file/file.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    // private fileService: FileService,
  ) {}

  getCookieWithJwtToken(user) {
    const payload = {
      _id: user?._id,
      email: user?.email,
    };
    const isProd = toLower(this.configService.get<string>('NODE_ENV')) === 'production';
    const meteorUrl = this.configService.get<string>('METEOR_URL');
    // const hostname = extractHostname(meteorUrl);
    const accessToken = this.jwtService.sign(payload);
    const maxAge = this.configService.get<number>('JWT_EXPIRATION_TIME');

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    // return `X-Pnyx-Authorization=${accessToken}; Path=/ ; Max-Age=${maxAge}; ${isProd ? 'httpOnly;secure;' : ''} `;

    // return generateAuthCookie({
    //   bearerName: this.configService.get<string>('JWT_BEARER_NAME'),
    //   bearer: accessToken,
    //   maxAge,
    //   secure: isProd,
    //   domain: hostname,
    // });
    return { user };
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.getByEmail(username);
    console.log('1user', user);

    if (!user?.password) throw new BadRequestException('Missing password');

    // const matched = await validatePassword(password, user?.password);

    // if (!matched) {
    //   console.log('oke sai 1');

    //   throw new BadRequestException('No user founded');
    // }

    return user;
  }
}
