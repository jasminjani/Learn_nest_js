import { Controller, Param, Patch } from '@nestjs/common';
import { DeleteUserService } from './delete-user.service';

@Controller('delete-user')
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  @Patch('/:id')
  async deleteUserById(@Param('id') id: number) {
    return await this.deleteUserService.deleteUserById(id);
  }
}
