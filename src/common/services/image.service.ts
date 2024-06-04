import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  constructor() {}

  async upload(file: Express.Multer.File) {
    console.log(file.originalname, file.mimetype);
    return {
      ok: true,
    };
  }
}
