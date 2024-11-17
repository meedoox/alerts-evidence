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
import { Multer } from 'multer';

@Controller('alerts')
export class AlertController {
  constructor(private alertService: AlertService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createAlert(@UploadedFile() file: Multer.File, @Body() body: any) {
    const data: CreateAlertDto = {
      ...body,
      age: parseInt(body.age, 10),
      userId: parseInt(body.userId, 10),
      file: file ? file.path : undefined,
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
  @UseInterceptors(FileInterceptor('file'))
  async updateAlert(
    @Param('id') id: string,
    @UploadedFile() file: Multer.File,
    @Body() body: any,
  ) {
    console.log(file);
    const data: CreateAlertDto = {
      ...body,
      age: parseInt(body.age, 10),
      userId: parseInt(body.userId, 10),
      file: file ? file.originalname : undefined,
    };

    console.log(data);
    return await this.alertService.updateAlert(Number(id), data);
  }

  @Delete(':id')
  async deleteAlert(@Param('id') id: string) {
    return await this.alertService.deleteAlert(Number(id));
  }
}
