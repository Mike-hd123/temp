import { Controller, Get, Request } from '@nestjs/common';
import { CoinService } from '../service/coin.service';

@Controller()
export class CoinController {
  constructor(private readonly CoinService: CoinService) { }

  @Get('mycoin')
  async getCoin() {
    return this.CoinService.find(1,10)
  }

  @Get('find')
  find(@Request() req) {
    var current = req.query.current
    var pagesize = req.query.pagesize
    return this.CoinService.find(current, pagesize)
  }

  @Get('test')
  test() {
    this.CoinService.test()
    return 'ok'
  }
}
