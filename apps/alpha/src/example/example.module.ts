import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { AccessGuard } from '../../../../libs/common/src /modules/access/guards/access.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schemas/example.schema';

@Module({
  imports: [
    // forwardRef(() => ClaimModule), demo
    // AuthModule,
    // forwardRef(() => UserModule),
    MongooseModule.forFeature([
      {
        name: Example.name,
        collection: 'Examples',
        schema: ExampleSchema,
      },
    ]),
  ],
  providers: [
    ExampleService,
    {
      provide: 'APP_GUARD',
      useClass: AccessGuard,
    },
  ],
  controllers: [ExampleController],
  exports: [
    ExampleService,
    MongooseModule.forFeature([
      {
        name: Example.name,
        collection: 'Examples',
        schema: ExampleSchema,
      },
    ]),
  ],
})
export class ExampleModule {}
