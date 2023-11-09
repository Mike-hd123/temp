import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Property, propertyType } from '../entity/property.entity';

@Injectable()
export class PropertyService {
  constructor(@InjectRepository(Property) private property: Repository<Property>) { }

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
}
