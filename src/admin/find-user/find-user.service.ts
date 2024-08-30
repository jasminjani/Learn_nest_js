import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FindUserService {
  constructor(private databaseService: DatabaseService) {}

  async findAllUsers() {
    return await this.databaseService.query('SELECT * FROM users');
  }
}
