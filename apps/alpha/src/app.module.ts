import { Module, Logger, forwardRef } from '@nestjs/common';
import { ExampleController } from './example/example.controller';
import { ExampleService } from './example/example.service';
import { ExampleModule } from './example/example.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AuthModule } from '../../../libs/common/src /modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available throughout the application
      envFilePath: 'apps/alpha/.env', // Specify the path to your .env file
      // You can also add validationSchema here if you want to validate env variables
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('MongoDB');
        // const uri = configService.get<string>('MONGO_URI');
        const uri = `mongodb+srv://quantrungthanh:quantrungthanh@twitter.epvh5co.mongodb.net/?retryWrites=true&w=majority`;

        try {
          await mongoose.connect(uri);
          console.log('Connection to MongoDB established successfully');
        } catch (error) {
          console.error('Failed to connect to MongoDB', error.toString());
        }
        return { uri };
      },
      inject: [ConfigService],
    }),
    forwardRef(() => ExampleModule),
    AuthModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
