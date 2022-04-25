import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/static'),
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: 'gmail',
          host: 'smtp.gmail.com',
          secrue: false,
          auth: {
            user: process.env.MAILDEV_INCOMING_USER,
            pass: process.env.MAILDEV_INCOMING_PASS,
          },
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      synchronize: true,
      entities: [User],
    }),
    UsersModule, 
    AuthModule, 
    FileModule
  ],
  controllers: [],
})
export class AppModule {}
