import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CuriosityController } from './controllers/curiosity.controller';
import { CategoryController } from './controllers/category.controller';
import { CuriosityService } from './services/curiosity.service';
import { CategoryService } from './services/category.service';
import { TopicService } from './services/topic.service';
import { TopicController } from './controllers/topic.controller';

@Module({
  imports: [PrismaModule],
  providers: [CuriosityService, CategoryService, TopicService],
  controllers: [CuriosityController, CategoryController, TopicController],
})
export class CuriositiesModule {}
