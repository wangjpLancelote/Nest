import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [UsersModule, HomeModule], /**装载module，即插即用 */
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
