import { forwardRef, Module } from '@nestjs/common';
import { FileModule } from 'src/file/file.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    FileModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
