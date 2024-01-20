import { Module, forwardRef } from '@nestjs/common';
import { ExemplaeController } from './example.controller';
import { ExampleService } from './example.service';
import { AccessGuard } from '../../../../libs/common/src /modules/access/guards/access.guard';
import { AccessService } from '../../../../libs/common/src /modules/access/access.service';

@Module({
  imports: [
    // forwardRef(() => ClaimModule), demo
    // AuthModule,
    // forwardRef(() => UserModule),
  ],
  providers: [
    ExampleService,
    {
      provide: 'APP_GUARD',
      useClass: AccessGuard,
    },
    // AccessService,
  ],
  controllers: [ExemplaeController],
  exports: [ExampleService],
})
export class ExampleModule {}
