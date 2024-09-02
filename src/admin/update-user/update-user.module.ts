import { Module } from '@nestjs/common';
import { UpdateUserController } from './update-user.controller';
import { UpdateUserService } from './update-user.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [UpdateUserController],
  providers: [DatabaseService, UpdateUserService],
})
export class UpdateUserModule {}
