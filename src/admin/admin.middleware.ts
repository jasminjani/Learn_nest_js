import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.log('Admin middleware', req.user?.role);
    if (!req.cookies?.jwt_token) {
      throw new UnauthorizedException();
    }
    next();
  }
}
