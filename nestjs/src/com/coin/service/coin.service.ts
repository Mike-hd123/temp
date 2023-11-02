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

  find(page, query) {
    const { current, size } = page
    const { name, names } = query
    const queryConditionList = []
    if (name) {
      queryConditionList.push("main_.name LIKE :name")
    }
    if (names) {
      queryConditionList.push("main_.name in (:...names)")
    }
    const queryCondition = queryConditionList.join(" AND ")
    let q = this.CoinEntity.createQueryBuilder("main_").select(["main_.name", "main_.price_usd", "main_.price_cny"])
      .andWhere(queryCondition, { name: `%${name}%`, names: names ? names.split(",") : '' })  
    if (current && size) q.skip((current - 1) * size).take(size)
    return q.getManyAndCount()
  }
}
