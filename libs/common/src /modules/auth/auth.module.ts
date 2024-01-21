// import { CreditModule } from '@app/alpha/credit/credit.module';
// import { MailerModule } from '@app/alpha/mailer/mailer.module';
// import { OrganisationModule } from '@app/alpha/organisation/organisation.module';
// import { AuthController } from '@app/common/modules/auth/auth.controller';
// import { AuthService } from '@app/common/modules/auth/auth.service';
// import { JwtStrategy } from '@app/common/modules/auth/passport/jwt.strategy';
// import { LocalStrategy } from '@app/common/modules/auth/passport/local.strategy';
// import { AuthProfile } from '@app/common/modules/auth/profile/auth.profile';
// import { UserModule } from '@app/common/modules/user/user.module';
// import { UserService } from '@app/common/modules/user/user.service';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    // forwardRef(() => UserModule),
    // forwardRef(() => CreditModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>('JWT_EXPIRATION_TIME')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
  ],

  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  exports: [AuthService, LocalStrategy, PassportModule],
})
export class AuthModule {}
