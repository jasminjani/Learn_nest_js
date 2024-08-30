import { Module } from '@nestjs/common';
import { DeleteUserController } from './delete-user.controller';
import { DeleteUserService } from './delete-user.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [DeleteUserController],
  providers: [DatabaseService, DeleteUserService],
})
export class DeleteUserModule {}
