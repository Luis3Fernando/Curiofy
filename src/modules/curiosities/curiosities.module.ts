import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CuriosityController } from './controllers/curiosity.controller';
import { CategoryController } from './controllers/category.controller';
import { CuriosityService } from './services/curiosity.service';
import { CategoryService } from './services/category.service';

@Module({
  imports: [PrismaModule],
  providers: [CuriosityService, CategoryService],
  controllers: [CuriosityController, CategoryController],
})
export class CuriositiesModule {}
