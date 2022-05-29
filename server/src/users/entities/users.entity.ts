import { Exclude } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsPhoneNumber, IsString, Length, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @IsString()
    id: string;

    @Column({ default: '' })
    @IsEmail()
    @Exclude({ toPlainOnly: true })
    email: string;

    @Column({ default: '' })
    @MinLength(4)
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column()
    @Length(3, 20)
    user_id: string;

    @Column({ default: '' })
    @Length(3, 20)
    username: string;

    @Column({ default: '' })
    avatar: string;

    @Column({ default: false })
    @IsBoolean()
    @Exclude({ toPlainOnly: true })
    isActive: boolean;

    @Column({ default: '' })
    @Exclude({ toPlainOnly: true })
    phone: string;

    @Column({ default: '' })
    @Length(4, 4, {
        message: '잘못된 코드'
    })
    @Exclude({ toPlainOnly: true })
    code: string;

    @CreateDateColumn({ select: false })
    @IsDate()
    @Exclude({ toPlainOnly: true })
    created_at: Date;

    @UpdateDateColumn({ select: false })
    @IsDate()
    @Exclude({ toPlainOnly: true })
    updated_at: Date;
}