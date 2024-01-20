// import { CirclesModule } from '@app/alpha/circles/circles.module';
// import { OrganisationModule } from '@app/alpha/organisation/organisation.module';
// import { AccessController } from '@app/common/modules/access/access.controller';
// import { AccessService } from '@app/common/modules/access/access.service';
// import { AccessProfile } from '@app/common/modules/access/profile/access.profile';
// import { AccessEntity, AccessSchema } from '@app/common/modules/access/schemas/access.schema';
// import { UserModule } from '@app/common/modules/user/user.module';
// import { forwardRef, Global, Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

import { Global, Module, forwardRef } from '@nestjs/common';
import { ExampleModule } from 'example/example.module';
import { AccessController } from './access.controller';
import { AccessGuard } from './guards/access.guard';
import { AccessService } from './access.service';

// import { AccessGuard } from './guards/access.guard';

@Global()
@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: AccessEntity.name,
    //     collection: 'AccessCollection',
    //     schema: AccessSchema,
    //   },
    // ]),
    forwardRef(() => ExampleModule),
  ],
  controllers: [AccessController],
  providers: [
    // AccessService, AccessProfile, AccessGuard
  ],
  exports: [
    // MongooseModule.forFeature([
    //   {
    //     name: AccessEntity.name,
    //     collection: 'AccessCollection',
    //     schema: AccessSchema,
    //   },
    // ]),
    AccessGuard,
    AccessService,
  ],
})
export class AccessModule {}
