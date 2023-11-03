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

export enum propertyType {
    //存款
    deposit = 'deposit',
    //负债
    liabilities = 'liabilities',
    //货币
    coin = 'coin'
}
