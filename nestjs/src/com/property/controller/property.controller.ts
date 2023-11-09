import { Controller, Get, Post, Request, Body } from '@nestjs/common';
import { PropertyService } from '../service/property.service';
import { Property } from '../entity/property.entity';

@Controller('api/property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }

  @Post('add')
  add(@Body() property: Property) {
    return this.propertyService.create(property)
  }

  @Post('update')
  updated(@Body() property: Property) {
    return this.propertyService.update(property)
  }

  @Get('delete')
  delele(@Request() req) {
    var id = req.query.id
    return this.propertyService.delete(id)
  }

  @Get('list')
  async find() {
    var res = await this.propertyService.find()
    return { data: res[0], total: res[1] }
  }
}
