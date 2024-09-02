import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UpdateUserService {
  constructor(private databaseService: DatabaseService) {}

  async updateUserById(userId: number, body: any) {
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

    if (!userId || !fname || !lname || !email || !password || !phone_no) {
      throw new BadRequestException('fields required');
      // return false;
    }

    try {
      await this.databaseService.query(
        'UPDATE users SET fname = ?, lname = ?, email = ?, password = ? , phone_no = ? , dob = ? , gender = ? , hobby = ? , city = ? WHERE id = ?',
        [
          fname,
          lname,
          email,
          password,
          phone_no,
          dob,
          gender,
          hobby,
          city,
          userId,
        ],
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
