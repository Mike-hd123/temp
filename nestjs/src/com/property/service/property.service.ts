import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Property, propertyType } from '../entity/property.entity';

@Injectable()
export class PropertyService {
  constructor(@InjectRepository(Property) private property: Repository<Property>, private readonly dataSource: DataSource) { }

  create(property) {
    property.update = new Date()
    return this.property.save(property)
  }

  update(property) {
    property.update = new Date()
    return this.property.update(property.id, property)
  }

  delete(id) {
    return this.property.delete(id)
  }

  async find() {
    const sql = "select case when type = 'coin' "
      + " then p.total * c.price_cny else p.total end as price,p.* "
      + " from property p left join coin c on p.name = c.name"
    const data = await this.dataSource.query(sql)
    const size = await this.dataSource.query("select count(*) as total from property")
    return [data, size[0].total]
  }

  cake() {
    const sql = "select type as name,sum(total) as value from property group by type"
    return this.dataSource.query(sql)
  }
}
