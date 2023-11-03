import { Controller, Get, Request } from '@nestjs/common';
import { PropertyService } from '../service/property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }

  @Get('add')
  add() {
    return this.propertyService.create()
  }

  @Get('update')
  updated(@Request() req) {
    var obj = {
      name: 'yyy'
    }
    return this.propertyService.update(req.query.id,obj) 
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
