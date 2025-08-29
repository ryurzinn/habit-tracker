import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-auth.dto';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,

      private readonly jwtService: JwtService
    ){}

  async create(createUserDto: CreateUserDto) {
   
    try {
      
      const {password, ...userData} = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);

      const {password: _, ...result} = user;

      return {
        ...result,
        token: this.getJwtToken({id: user.id})
      }

    } catch (error) {
       this.handleDBErrors(error);
    }

  }

  async login(loginUserDto: LoginUserDto) {
    
    const {password, email} = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: {email: true, password: true, id: true}
    });

    if(!user) throw new UnauthorizedException('Credentials are not valid (email)');

    if( !bcrypt.compareSync(password, user.password) ) throw new UnauthorizedException('Credentials are not valid (password)' );

    return {
      ...user,
      jwt: this.getJwtToken({id: user.id})
    }

  }


  private handleDBErrors(error: any): never {

    if( error.code === '23025' ) throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');


  }

  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;

  }

}


