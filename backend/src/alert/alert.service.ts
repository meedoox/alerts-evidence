import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Alert, CreateAlertDto, GetAllAlertsResponse } from './alert.types';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) {}

  async createAlert(data: CreateAlertDto): Promise<Alert> {
    return await this.prisma.alert.create({ data });
  }

  async getAllAlerts(
    includeUsers: boolean = false,
  ): Promise<GetAllAlertsResponse[]> {
    return await this.prisma.alert.findMany({
      include: { user: includeUsers },
    });
  }

  async getAlertById(
    id: number,
    includeUser: boolean = false,
  ): Promise<GetAllAlertsResponse> {
    return await this.prisma.alert.findUnique({
      where: { id },
      include: { user: includeUser },
    });
  }

  async updateAlert(id: number, data: Partial<CreateAlertDto>): Promise<Alert> {
    return await this.prisma.alert.update({
      where: { id },
      data,
    });
  }

  async deleteAlert(id: number): Promise<Alert> {
    return await this.prisma.alert.delete({ where: { id } });
  }
}
