import { Module } from '@nestjs/common';
import { CuriositiesService } from './services/curiosities/curiosities.service';
import { CuriosityController } from './controllers/curiosity.controller';
import { CuriosityService } from './services/curiosity.service';

@Module({
  providers: [CuriositiesService, CuriosityService],
  controllers: [CuriosityController]
})
export class CuriositiesModule {}
