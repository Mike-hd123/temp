import { Controller, Get, Request } from '@nestjs/common';
import { CoinService } from '../service/coin.service';

@Controller()
export class CoinController {
  constructor(private readonly CoinService: CoinService) { }

  @Get('find')
  async find(@Request() req) {
    var page = {
      current: req.query.current,
      size: req.query.size
    }
    var query = {
      name: req.query.name,
      names: req.query.names,
    }
    var res = await this.CoinService.find(page, query)
    return { data: res[0], total: res[1] }
  }

}
