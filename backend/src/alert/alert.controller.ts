import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './alert.types';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer, diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Controller('alerts')
export class AlertController {
  constructor(private alertService: AlertService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          fs.mkdirSync('./uploads/', { recursive: true });
          const uniqueName = `${uuidv4()}-${path.normalize(file.originalname)}`;
          file.originalname = uniqueName;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async createAlert(@UploadedFile() file: Multer.File, @Body() body: any) {
    const data: CreateAlertDto = {
      ...body,
      age: parseInt(body.age, 10),
      userId: parseInt(body.userId, 10),
      file: file ? `./uploads/${file.originalname}` : undefined,
    };

    return await this.alertService.createAlert(data);
  }

  @Get()
  async getAllAlerts(@Query('includeUsers') includeUsers: string) {
    return await this.alertService.getAllAlerts(includeUsers === 'true');
  }

  @Get(':id')
  async getAlertById(
    @Param('id') id: string,
    @Query('includeUser') includeUser: string,
  ) {
    return await this.alertService.getAlertById(
      Number(id),
      includeUser === 'true',
    );
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          fs.mkdirSync('./uploads/', { recursive: true });
          const uniqueName = `${uuidv4()}-${path.normalize(file.originalname)}`;
          file.originalname = uniqueName;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async updateAlert(
    @Param('id') id: string,
    @UploadedFile() file: Multer.File,
    @Body() body: any,
  ) {
    const data: CreateAlertDto = {
      ...body,
      age: parseInt(body.age, 10),
      userId: parseInt(body.userId, 10),
      file: file ? `./uploads/${file.originalname}` : undefined,
    };

    return await this.alertService.updateAlert(Number(id), data);
  }

  @Delete(':id')
  async deleteAlert(@Param('id') id: string) {
    return await this.alertService.deleteAlert(Number(id));
  }
}
