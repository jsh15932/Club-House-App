import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { v4 as uuidv4 }from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
    async LoadFile(file: Express.Multer.File): Promise<string> {
        try {
            const staticFoler = join(__dirname, '..', '..', 'static');
            const uuidName = uuidv4();
            const extention = file.originalname.split('.').pop();
            const newName = `${uuidName}.${extention}`;
            const pathName = `${staticFoler}/${uuidName}.${extention}`;
            const buffer = await sharp(Buffer.from(file.buffer))
                .resize(320, 320)
                .png()
                .toBuffer();

            if(file.size > 50000) {
                throw new HttpException('파일 용량 초과', HttpStatus.FORBIDDEN);
            }
            if(!fs.existsSync(staticFoler)) {
                await fs.mkdirSync(staticFoler);
            }
            fs.writeFileSync(pathName, buffer);
            return newName;
        } catch(e: any) {
            throw new HttpException('FileService', HttpStatus.FORBIDDEN);
        }
    }
    
}