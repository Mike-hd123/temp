import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Coin {

    @PrimaryGeneratedColumn('uuid')
    id: number

    //名称
    @Column()
    name: string

    //现价(usd)
    @Column({ type: 'decimal', precision: 20, scale: 5 })
    price_usd: number

    //现价(cny)
    @Column({ type: 'decimal', precision: 20, scale: 5 })
    price_cny: number

}
