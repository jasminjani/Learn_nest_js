import { Body, Controller, HttpStatus, Param, Put, Res } from '@nestjs/common';
import { UpdateUserService } from './update-user.service';
import { Response } from 'express';

@Controller('update-user')
export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}

  @Put('/:id')
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: Record<string, any>,
    @Res() res: Response,
  ) {
    const updatedData = await this.updateUserService.updateUserById(
      id,
      updateUserDto,
    );

    if (updatedData === false) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Error occured while adding data',
      });
    }

    return res.status(HttpStatus.CREATED).json({
      message: 'Data updated succesfully',
    });
  }
}
