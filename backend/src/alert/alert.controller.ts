import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './alert.types';

@Controller('alerts')
export class AlertController {
  constructor(private alertService: AlertService) {}

  @Post()
  async createAlert(
    @Body()
    data: CreateAlertDto,
  ) {
    return await this.alertService.createAlert(data);
  }

  @Get()
  async getAllAlerts() {
    return await this.alertService.getAllAlerts();
  }

  @Get(':id')
  async getAlertById(@Param('id') id: string) {
    return await this.alertService.getAlertById(Number(id));
  }

  @Put(':id')
  async updateAlert(
    @Param('id') id: string,
    @Body() data: Partial<CreateAlertDto>,
  ) {
    return await this.alertService.updateAlert(Number(id), data);
  }

  @Delete(':id')
  async deleteAlert(@Param('id') id: string) {
    return await this.alertService.deleteAlert(Number(id));
  }
}
