import {
  // BadRequestException,
  Injectable,
  // UnauthorizedException,
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

  async validateUser(username: string, pass: string) {
    const user = await this.findUser(username);

    // if (user?.length < 1) {
    //   throw new BadRequestException('Invalide credential');
    // }

    if (user?.length && user[0]?.password === pass) {
      // const payload = { sub: user[0].userId, username: user[0].userName };
      // const jwt_token = await this.jwtService.signAsync(payload);
      // return { message: 'User Login Successfully', jwt_token };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user[0];
      return result;
    } else {
      // throw new UnauthorizedException();
    }
    return null;
  }

  async generateJwtToken(user: any) {
    const payload = { sub: user.userId, username: user.userName };
    return await this.jwtService.signAsync(payload);
  }

  async findUser(username: string) {
    return await this.databaseService.query(
      'SELECT * FROM users WHERE name = ?',
      [username],
    );

    // return users.find((user) => user.userName === username);   // finding matching username from static users
  }
}
