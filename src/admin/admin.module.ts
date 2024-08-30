import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FindUserModule } from './find-user/find-user.module';
import { AdminMiddleware } from './admin.middleware';
import { DeleteUserModule } from './delete-user/delete-user.module';

@Module({
  imports: [AuthModule, FindUserModule, DeleteUserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes('find-user', 'delete-user');
  }
}
