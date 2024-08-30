import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addFormData(body: any): Promise<boolean> {
    const {
      fname,
      lname,
      email,
      password,
      phone_no,
      dob,
      gender,
      hobby,
      city,
    } = body;

    if (!fname || !lname || !email || !password || !phone_no) {
      return false;
    }

    try {
      await this.databaseService.query(
        'INSERT INTO users (fname, lname, email, password, phone_no, dob, gender, hobby, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          fname,
          lname,
          email,
          password,
          phone_no,
          dob,
          gender,
          hobby?.toString(),
          city,
        ],
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
