import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CuriosityController } from './controllers/curiosity.controller';
import { CategoryController } from './controllers/category.controller';
import { CuriosityService } from './services/curiosity.service';
import { CategoryService } from './services/category.service';
import { TopicService } from './services/topic.service';
import { TopicController } from './controllers/topic.controller';
import { MailModule } from '@modules/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { CuriosityQueryService } from './services/curiosity-query.service';
import { CuriosityQueryController } from './controllers/curiosity-query.controller';

@Module({
  imports: [
    PrismaModule,
    MailModule,
    JwtModule,
    JwtModule.register({ secret: process.env.JWT_APPROVAL_SECRET }),
  ],
  providers: [
    CuriosityService,
    CategoryService,
    TopicService,
    CuriosityQueryService,
  ],
  controllers: [
    CuriosityController,
    CategoryController,
    TopicController,
    CuriosityQueryController,
  ],
})
export class CuriositiesModule {}
