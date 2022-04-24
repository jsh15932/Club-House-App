import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UserProfileDto } from 'src/users/dto/dto';
import { UserService } from 'src/users/users.service';
import { RegistResDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ) {}

    async Regist(user: UserDto): Promise<RegistResDto> {
        const code: string = this.RandomCode();
        if(user.email?.length) {
            const existEmail = await this.ExistEmail(user);
            if(existEmail.error) {
                return existEmail;
            }
        }
        return;
    }

    RandomCode(): string {
        const code = Math.random() * 1000000;
        return code.toString().substring(0, 4);
    }

    async ExistEmail(user: UserProfileDto): Promise<RegistResDto> {
        const exist = await this.userService.findOne('email', user.email);
        if(exist && exist.code.length) {
            return {
                id: undefined,
                message: '이미 존재하는 이메일',
                error: true
            };
        }
        return {
            id: undefined,
            message: '사용 가능한 이메일',
            error: false
        };
    }
}
