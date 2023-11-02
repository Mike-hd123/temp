import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//定时器
import { ScheduleModule } from '@nestjs/schedule';
//自定义包
import { jobModule } from './job/job.module';
import { coinModule } from './com/coin/coin.module';

@Module({
  imports: [
    //定时器
    ScheduleModule.forRoot(),
    //数据库
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "test.sqlite",
      autoLoadEntities: true,
      synchronize: true,
      //开启日志 - 打印sql
      // logging: true
    }),
    //实体
    jobModule,
    coinModule
  ]
})
export class AppModule { }
