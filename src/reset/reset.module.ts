import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetEnitity } from './reset.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ResetEnitity]),
  MailerModule.forRoot({
    transport:{
      host:'localhost',
      port:1025
    },
    defaults:{
      from:'noreply@localhost.com'
    }
  }),
  AuthModule
  
  ],
  providers: [ResetService],
  controllers: [ResetController]
})
export class ResetModule {}
