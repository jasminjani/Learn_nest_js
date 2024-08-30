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
  //     email: 'john',
  //     password: 'John@1234',
  //   },
  //   {
  //     userId: 2,
  //     email: 'shraddha',
  //     password: 'Shradhha@1234',
  //   },
  // ];

  async validateUser(email: string, pass: string) {
    const user = await this.findUser(email);

    // if (user?.length < 1) {
    //   throw new BadRequestException('Invalide credential');
    // }

    if (
      user?.length &&
      user[0]?.password === pass &&
      user[0].role === 'admin'
    ) {
      // const payload = { sub: user[0].userId, email: user[0].email };
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
    const payload = { sub: user.userId, email: user.email };
    return await this.jwtService.signAsync(payload);
  }

  async findUser(email: string) {
    return await this.databaseService.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );

    // return users.find((user) => user.email === email);   // finding matching email from static users
  }
}
