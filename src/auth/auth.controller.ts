import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async userSignIn(
    @Body() signInDto: Record<string, any>,
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(
      signInDto.userName,
      signInDto.password,
    );

    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Invalid credentials',
      });
    }

    const jwt_token = await this.authService.generateJwtToken(user);
    user.jwt_token = jwt_token;

    return res
      .cookie('jwt_token', jwt_token, {
        httpOnly: true,
        maxAge: 3600000,
      })
      .status(HttpStatus.CREATED)
      .json({
        user: user,
      });
  }

  @Post('logout')
  async userLogOut(@Res() res: Response) {
    return res.clearCookie('jwt_token').json({
      message: 'User Logout successfully',
    });
  }
}
