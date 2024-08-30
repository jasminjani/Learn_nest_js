import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FindUserModule } from './find-user/find-user.module';
import { AdminMiddleware } from './admin.middleware';

@Module({
  imports: [AuthModule, FindUserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes('find-user');
  }
}
