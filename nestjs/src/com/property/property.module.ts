import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//自定类
import { Property } from './entity/property.entity';
import { PropertyController } from './controller/property.controller';
import { PropertyService } from './service/property.service';

@Module({
    imports: [
        //实体
        TypeOrmModule.forFeature([Property]),
    ],
    controllers: [PropertyController],
    providers: [PropertyService]
})
export class propertyModule { }
