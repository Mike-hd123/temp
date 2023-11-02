import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { CoinService } from 'src/com/coin/service/coin.service';

@Injectable()
export class testJob {
    constructor(private readonly coinService: CoinService) { }

    @Cron('0 */5 * * * *')
    async handleCron() {
        var res = await axios.get('http://www.mexc.com/api/platform/common/coin/price/cny')
        var CNY = res.data.data.USDT
        var res = await axios.get('http://www.mexc.com/api/platform/spot/market/symbols')
        var USDTS = res.data.data['USDT']
        var coinList = []
        USDTS.forEach((e) => {
            var temp = {
                name: e.currency,
                price_cny: e.c * CNY,
                price_usd: e.c
            }
            coinList.push(temp)
        })
        this.coinService.create(coinList)
    }
}