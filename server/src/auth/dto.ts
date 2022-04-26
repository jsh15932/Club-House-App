export class RegistResDto {
    id?: string | undefined;
    message: string;
    error: boolean;
}

export class LoginReqDto {
    field: string;
    login: string;
    password: string;
}

export class LoginResDto {
    access_token?: string;
    message: string;
    error: boolean;
}