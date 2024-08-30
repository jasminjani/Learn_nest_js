import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DeleteUserService {
  constructor(private databaseService: DatabaseService) {}

  async deleteUserById(userId: number) {
    return await this.databaseService.query(
      'UPDATE users SET isDeleted = 1 WHERE id = ?',
      [userId],
    );
  }
}
