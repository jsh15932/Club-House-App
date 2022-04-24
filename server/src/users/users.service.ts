import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
