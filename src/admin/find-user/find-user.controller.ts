import { Controller, Get } from '@nestjs/common';
import { FindUserService } from './find-user.service';
// import { Response } from 'express';

@Controller('find-user')
export class FindUserController {
  constructor(private findUserService: FindUserService) {}

  @Get()
  async getAllUsers() {
    return await this.findUserService.findAllUsers();
  }
}
