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

  find() {
    let q = this.property.createQueryBuilder()
    return q.getManyAndCount()
  }

  cake() {
    const sql = "select type,sum(total) from property group by type"
    return this.dataSource.query(sql)
  }
}
