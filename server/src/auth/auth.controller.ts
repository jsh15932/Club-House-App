import { Body, Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';
import { RegistResDto } from './dto';

@Controller('/api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/reigst')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
    async Regist(
        @UploadedFile() files: Array<Express.Multer.File> | string,
        @Body() body: UserDto,
    ): Promise<RegistResDto> {
        try {
            const parseBody = { ...JSON.parse(JSON.stringify(body)) };
            const user = Object.assign(
                parseBody.hasOwnProperty('avatar') ? parseBody : {
                    avatar: JSON.parse(JSON.stringify(files)).avatar[0],
                    ...parseBody,
                },
                body,
            );
            const profile = await this.authService.Regist(user);
            return profile;
        } catch (e) {
            throw new HttpException('Regist', HttpStatus.FORBIDDEN);
        }
    }

}
