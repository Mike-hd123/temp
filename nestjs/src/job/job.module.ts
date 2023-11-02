import { Module } from '@nestjs/common';
import { testJob } from './testJob';
import { coinModule } from 'src/com/coin/coin.module';

@Module({
    imports: [coinModule],
    providers: [testJob],
})
export class jobModule { }