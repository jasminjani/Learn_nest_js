import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.log('Admin middleware');
    if (!req.jwt_token || req.user.role !== 'admin') {
      throw new UnauthorizedException();
    }
    next();
  }
}
