import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Property, propertyType } from '../entity/property.entity';

@Injectable()
export class PropertyService {
  constructor(@InjectRepository(Property) private property: Repository<Property>) { }

  create() {
    return this.property.save({ name: 'xxx行', type: propertyType.coin, total: 4000, interest: 0.52, update: new Date() })
  }

  update(id,obj) {
    return this.property.update(id,obj)
  }

  delete(id) {
    return this.property.delete(id)
  }
  
  find() {
    let q = this.property.createQueryBuilder()
    return q.getManyAndCount()
  }
}
