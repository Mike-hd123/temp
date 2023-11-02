import { Controller, Get, Request } from '@nestjs/common';
import { CoinService } from '../service/coin.service';

@Controller()
export class CoinController {
  constructor(private readonly CoinService: CoinService) { }

  @Get('find')
  async find(@Request() req) {
    var current = req.query.current
    var size = req.query.size
    var res = await this.CoinService.find(current, size)
    return { data: res[0], total: res[1] }
  }

}
