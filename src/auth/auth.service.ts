import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly databaseService: DatabaseService,
  ) {}

  // private readonly users = [  // this is static users details
  //   {
  //     userId: 1,
  //     userName: 'john',
  //     password: 'John@1234',
  //   },
  //   {
  //     userId: 2,
  //     userName: 'shraddha',
  //     password: 'Shradhha@1234',
  //   },
  // ];

  async userSignIn(username: string, pass: string) {
    // console.log('username :>> ', username);
    const user = await this.findUser(username);
    // console.log('user :>> ', user);

    if (user?.length < 1) {
      throw new BadRequestException();
    }

    if (user && user[0]?.password === pass) {
      const payload = { sub: user[0].userId, username: user[0].userName };
      // return { access_token: await this.jwtService.signAsync(payload) };
      const jwt_token = await this.jwtService.signAsync(payload);

      return { message: 'User Login Successfully', jwt_token };
    } else {
      throw new UnauthorizedException();
    }
  }

  async findUser(username: string) {
    return await this.databaseService.query(
      'SELECT * FROM users WHERE name = ?',
      [username],
    );

    // return users.find((user) => user.userName === username);   // finding matching username from static users
  }
}
