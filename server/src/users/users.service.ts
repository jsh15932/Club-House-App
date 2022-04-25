import { Body, HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async, retry } from 'rxjs';
import { UserDto } from 'src/dto/user.dto';
import { Repository } from 'typeorm';
import { UserProfileDto } from './dto/dto';
import { User } from './entities/users.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async Create(user: UserProfileDto): Promise<UserDto> {
        const create = await this.userRepository.create(user);
        const profile = await this.userRepository.save(create);
        return profile;
    }

    async findOne(props: string, val: string, relation?: string): Promise<UserDto> {
        const looking = relation
            ? { where: { [props]: val }, relations: [relation] }
            : { where: { [props]: val } };
        const profile = await this.userRepository.findOne(looking);
        return profile;
    }

    async Update(criteria: string, user: UserProfileDto): Promise<any> {
        const { id, ...rest } =  user;
        const update = await this.userRepository
            .update({ [criteria]: user[criteria] }, { ...rest })
            .then(async (response) => {
                return await this.userRepository.findOne({
                    where: { [criteria]: user[criteria] },
                });
            })
            .catch(() => new HttpException(
                '사용자 정보 변경 실패',
                HttpStatus.FORBIDDEN,
            ),
        );
        return update;
    }
}
