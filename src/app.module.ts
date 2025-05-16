import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './test/task.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CuriositiesModule } from './modules/curiosities/curiosities.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [TaskModule, UserModule, AuthModule, CuriositiesModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
