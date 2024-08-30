import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('add')
  async addFormData(
    @Body() formDataDto: Record<string, any>,
    @Res() res: Response,
  ) {
    const data = await this.usersService.addFormData(formDataDto);

    if (data === false) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Error occured while adding data',
      });
    }

    return res.status(HttpStatus.CREATED).json({
      message: 'Data added succesfully',
    });
  }
}
