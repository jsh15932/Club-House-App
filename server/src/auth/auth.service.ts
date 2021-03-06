import { MailerService } from '@nestjs-modules/mailer';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UserProfileDto } from 'src/users/dto/dto';
import { UserService } from 'src/users/users.service';
import { LoginReqDto, LoginResDto, RegistResDto } from './dto';
import * as SMS from 'sms_ru';
import * as bcrypt from 'bcrypt';
import { FileService } from 'src/file/file.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly mailerService: MailerService,
        private readonly fileService: FileService,
        private readonly jwtService: JwtService,
    ) {}

    async Regist(user: UserDto): Promise<RegistResDto> {
        const code: string = this.RandomCode();
        if(user.email?.length) {
            const existEmail = await this.ExistEmail(user);
            if(existEmail.error) {
                return existEmail;
            }
            await this.EmailActivate(code, user.email, user.username);
        } else if(user.phone?.length) {
            const existPhone = await this.ExistPhone(user);
            if(existPhone) {
                return existPhone;
            }
            await this.SMSActivate(code, user.phone);
        }
        if(user.password.length) {
            user.password = await this.BcryptHash(user.password);
        }
        const pathUrl = typeof user.avatar === 'string' ? user.avatar : await this.fileService.LoadFile(user.avatar);
        const profile = user.hasOwnProperty('id') ? await this.userService.Update('id', { ...user, avatar: pathUrl, code }) : await this.userService.Create({ ...user, avatar: pathUrl, code });
        return {
            id: profile.id ? profile.id : user.id,
            message: 'success',
            error: false,
        };
    }

    async Login(data: LoginReqDto): Promise<LoginResDto> {
        const user = await this.userService.findOne(data.field, data.login);
        if(!user) {
            return {
                message: '???????????? ?????? ??????',
                error: true,
            };
        }
        const match = await bcrypt.compare(data.password, user.password);
        if(!match) {
            return {
                message: '???????????? ?????? ????????????',
                error: true,
            }
        }
        const token = await this.CreateToken(user);
        return {
            ...token,
            message: '',
            error: false,
        };
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
                message: '?????? ???????????? ?????????',
                error: true
            };
        }
        return {
            id: undefined,
            message: '?????? ????????? ?????????',
            error: false
        };
    }

    async EmailActivate(
        code: string,
        email: string,
        name: string,
    ): Promise<void> {
        this.mailerService
            .sendMail({
                to: email,
                from: process.env.MAILDEV_INCOMING_USER,
                subject: '?????? ????????? ????????????',
                text: '???????????? ??????',
                html: `<b>${name}, ???????????? ??????. ?????? ?????? : ${code}</b>`,
            })
            .catch((err) => {
                throw new HttpException(
                    '???????????? ??????',
                    HttpStatus.FORBIDDEN,
                );
            });
    }

    async ExistPhone(user: UserDto): Promise<RegistResDto> {
        const exist = await this.userService.findOne('phone', user.phone);
        if(exist && exist.code.length) {
            return {
                id: undefined,
                message: '?????? ???????????? ????????? ??????',
                error: true,
            };
        }
        return {
            id: undefined,
            message: '?????? ????????? ????????? ??????',
            error: false,
        };
    }

    async SMSActivate(code: string, phone: string): Promise<void> {
        const sms = new SMS(process.env.SMS_KEY_SECRET);
        const onlyNumber = phone.replace(
            /^[+]([0-9]{2})[-\s\.][(]{0,1}([0-9]{3})[)]{0,1}[-\s\.]{0,1}([0-9]{3})[-\s\.]{0,1}([0-9]{2})[-\s\.]{0,1}([0-9]{2})$/,
            (str, $1, $2, $3, $4, $5) => {
                return `${$1}${$2}${$3}${$4}${$5}`;
            },
        );

        await sms.sms_send(
            {
                to: onlyNumber,
                text: code,
            },
            function(e) {
                throw e;
            }
        );
    }
    
    async BcryptHash(password: string): Promise<string> {
        const hash = await bcrypt.hash(
            password,
            Number(process.env.CRYPTO_WORD_SECRET),
        );
        return hash;
    }

    async CreateToken(user: UserDto): Promise<{ access_token: string }> {
        const payload = {
            id: user.id,
            name: user.username,
            email: user.email,
            avatar: user.avatar,
            phone: user.phone,
            sub: user.id,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
