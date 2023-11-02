import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoinEntity } from '../entity/coin.entity';

@Injectable()
export class CoinService {
  constructor(@InjectRepository(CoinEntity) private CoinEntity: Repository<CoinEntity>) { }

  create(coinList) {
    this.CoinEntity.createQueryBuilder().delete().execute().then(
      () => this.CoinEntity.createQueryBuilder().insert().into(CoinEntity).values(coinList).execute().then(
        () => console.log('更新:' + new Date().toLocaleTimeString())
      )
    )
  }

  find(current, pagesize) {
    return this.CoinEntity.createQueryBuilder().skip((current - 1) * pagesize).take(pagesize).getManyAndCount()
  }

  test() {
    console.log('123')
  }
}
