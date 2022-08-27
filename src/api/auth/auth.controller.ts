import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { request } from 'http';
import { AuthService } from './auth.service';
import { ChangePasswordAuthDto } from './dto/changepassword-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userdto: CreateAuthDto) {
    let newuser = await this.authService.signup(userdto); 

    const { Id, password, failedloginAttempt, firstlogin, ...result } = newuser;

    return result;
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.loginLocal(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUser(@Req() req) {   
    console.log(req.user) 
    return req.user.email
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async passwordChange(@Req() req, @Body() dto: ChangePasswordAuthDto) {   
    //console.log(req.user) 
    const userId = req.user.Id;
    return await this.authService.changepassword(dto, userId);
  }

  
}

