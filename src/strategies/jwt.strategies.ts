import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/auth/entities/user.entity";
import { JwtPayload } from "src/interfaces/jwt-payload.interface";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy) {

    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        configService: ConfigService
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET') as string,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload) {
        const {id} = payload;

        const user = await this.userRepository.findOneBy({id: id});

        if(!user) throw new UnauthorizedException('Token not valid');

        if(!user.isActive) throw new UnauthorizedException('User is inactive, talk with an admin');

        return user;
    }

}