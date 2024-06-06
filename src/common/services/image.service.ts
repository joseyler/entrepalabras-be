import { Injectable } from '@nestjs/common';
import axiosInstance from '../../axios/config';
const key: string = 'a10172de328b2ab0f44df356895ea851';
@Injectable()
export class ImageService {
  constructor() {}

  async upload(file: Express.Multer.File) {
    const formdata: FormData = new FormData();
    formdata.append('image', new Blob([Buffer.from(file.buffer)]));
    formdata.append('key', key);
    formdata.append('name', 'nombre');
    const response = await axiosInstance.post('/upload', formdata);
    return response.data;
  }
}
