import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//自定类
import { Coin } from './entity/coin.entity';
import { CoinController } from './controller/coin.controller';
import { CoinService } from './service/coin.service';

@Module({
    imports: [
        //实体
        TypeOrmModule.forFeature([Coin]),
    ],
    controllers: [CoinController],
    providers: [CoinService],
    exports: [CoinService]
})
export class coinModule { }
