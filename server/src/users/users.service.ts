import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { Repository } from 'typeorm';
import { userProfileDto } from './dto/dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async Create(user: userProfileDto): Promise<UserDto> {
        const create = await this.userRepository.create(user);
        const profile = await this.userRepository.save(create);
        return profile;
    }
    
}
