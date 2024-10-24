import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtservice:JwtService){

  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
  
    const token = this.extractoken(request);
    if (!token) {
      throw new UnauthorizedException()
    }
    const tokenverity = await this.verifytoken(token);
    
    return true;
  }
  private extractoken(request:Request){
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
  private async verifytoken(token:string){
    
    try {
      const tokenverify = await this.jwtservice.verifyAsync(token,{
        secret:process.env.SECRET_KEY
      });
      return tokenverify  
    } catch (error) {
      
      throw new UnauthorizedException()
      
    }
    
  }
}


