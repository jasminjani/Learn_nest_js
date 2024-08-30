import { Module } from '@nestjs/common';
import { FindUserController } from './find-user.controller';
import { FindUserService } from './find-user.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [FindUserController],
  providers: [DatabaseService, FindUserService],
})
export class FindUserModule {}
