import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_KEY } from '../decorators/auth.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('🛡️ AuthGuard - Hello auth happening!');
    
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const requiredAuth = this.reflector.getAllAndOverride<string[]>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // For now, just log - implement actual auth logic later
    console.log('🔍 Checking authentication...', { user, requiredAuth });

    return true; // Placeholder - implement actual auth check
  }
}

