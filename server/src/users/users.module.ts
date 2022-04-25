import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FileModule } from 'src/file/file.module';
import { User } from './entities/users.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FileModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
