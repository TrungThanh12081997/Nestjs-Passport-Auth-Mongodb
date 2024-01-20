import { Module } from '@nestjs/common';
import { ExemplaeController } from './example/example.controller';
import { ExampleService } from './example/example.service';
import { ExampleModule } from './example/example.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ExampleModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available throughout the application
      envFilePath: 'apps/alpha/.env', // Specify the path to your .env file
      // You can also add validationSchema here if you want to validate env variables
    }),
  ],
  controllers: [ExemplaeController],
  providers: [ExampleService],
})
export class AppModule {}
