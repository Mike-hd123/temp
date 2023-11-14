import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Property {

    @PrimaryGeneratedColumn('uuid')
    id: number

    //名称
    @Column()
    name: string

    //类型
    @Column()
    type: string

    //总量
    @Column({ type: 'decimal', precision: 20, scale: 2 })
    total: number

    //利率
    @Column({ type: 'float' })
    interest: number

    //更新日期
    @Column()
    update: Date
}

export function getPropertyTypeName(name) {
    var value = '';
    switch (name) {
        case ('coin'):
            value = propertyType.coin
            break;
        case ('liabilities'):
            value = propertyType.liabilities
            break;
        case ('deposit'):
            value = propertyType.deposit
            break;
    }
    return value
}

export enum propertyType {
    deposit = '存款',
    liabilities = '负债',
    coin = '货币'
}
