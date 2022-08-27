import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordAuthDto } from './dto/changepassword-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth) private readonly authrepo: Repository<Auth>, private jwtService: JwtService
      ){}

      async signup(dto: CreateAuthDto): Promise<Auth>{    
        if(dto.password !== dto.confirmpassword){
           throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: 'The password and confirm password mismatched',
          }, HttpStatus.FORBIDDEN);
        }    
        const saltOrRounds = 12    
        const hashPassword = await bcrypt.hash(dto.password, saltOrRounds);
    
        const newUser = new Auth()
        newUser.fullname = dto.fullname;
        newUser.phoneNo = dto.phoneNo;
        newUser.password = hashPassword;
        newUser.failedloginAttempt = 0;
        newUser.firstlogin = false;
        newUser.role = 'Member'
        
        return this.authrepo.save(newUser);
      }

      async findOneByPhoneno(condition: any){
        //const user = await this.authrepo.findOne({ where: {email: condition}});
        const user = await this.authrepo.findOne({ where: {phoneNo: condition}})
        return user
      }
    
      async findOneById(Id: string){
        const user = await this.authrepo.createQueryBuilder('a')
        .where('a.Id = :id', {id: Id}).getOne();
        return user;
      }

      async loginLocal(dto: LoginDto){
          const user = await this.findOneByPhoneno(dto.phoneNo);
         if(!user){
            throw new BadRequestException('invalid Credential');
          }
      
          if(!await bcrypt.compare(dto.password, user.password)){
            throw new BadRequestException('invalid Credential');
          }

          const role= user.role
          const userId = user.Id
          const phoneNo = user.phoneNo
          const token = this.loginUser(user.Id, user.phoneNo, 'user');
          return {token, role, userId, phoneNo}
      }

      loginUser(userId: string, email: string, type: string){
          return this.jwtService.sign({sub: userId, email, claim: type});
      }
    
      async changepassword(dto: ChangePasswordAuthDto, userId: string){
        const user = await this.findOneById(userId);
        if(!user){
          throw new BadRequestException('invalid Credential');
        }

        if(dto.newpassword !== dto.confirmpassword){
          throw new BadRequestException('New passwprd and confirm password miss match');
        }
        if(!await bcrypt.compare(dto.oldpassword, user.password)){
          throw new BadRequestException('password miss match');
        }

        const saltOrRounds = 12    
        const hashPassword = await bcrypt.hash(dto.newpassword, saltOrRounds);    

        user.password = hashPassword;
        await this.authrepo.save(user);
        return('your new password is ready')
      }

}
