import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
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
