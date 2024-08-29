import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly users = [
    {
      userId: 1,
      userName: 'john',
      password: 'John@1234',
    },
    {
      userId: 2,
      userName: 'shraddha',
      password: 'Shradhha@1234',
    },
  ];

  async userSignIn(username: string, pass: string) {
    const user = this.findUser(username);

    // if (user?.length < 1) {
    //   throw new BadRequestException();
    // }

    if (user?.password === pass) {
      const payload = { sub: user.userId, username: user.userName };
      // return { access_token: await this.jwtService.signAsync(payload) };
      const jwt_token = await this.jwtService.signAsync(payload);

      return { message: 'User Login Successfully', jwt_token };
    } else {
      throw new UnauthorizedException();
    }
  }

  findUser(username: string) {
    return this.users.find((user) => user.userName === username);
  }
}
