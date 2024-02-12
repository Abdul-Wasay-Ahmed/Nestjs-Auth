import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetModule } from './reset/reset.module';



@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_auth',
      autoLoadEntities:true,
      synchronize: true,
    }),
    ResetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
