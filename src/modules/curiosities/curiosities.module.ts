import { Module } from '@nestjs/common';
import { CuriosityController } from './controllers/curiosity.controller';
import { CuriosityService } from './services/curiosity.service';

@Module({
  providers: [CuriosityService],
  controllers: [CuriosityController],
})
export class CuriositiesModule {}
