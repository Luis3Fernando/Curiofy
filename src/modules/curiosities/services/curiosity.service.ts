import { Injectable } from '@nestjs/common';
import { PrismaService } from '@data/prisma.service';

@Injectable()
export class CuriosityService {
  constructor(private readonly prisma: PrismaService) {}
}
