import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity('games')
export class Games {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, length: 255})
    name: string

    @Column({nullable: false, type: 'decimal'})
    price: number

    @Column({nullable: false, length: 255})
    category: string

    @Column({nullable: true, default: 14})
    rental_days: number

    @Column({nullable: true, default: false})
    rented: boolean

    @Column({nullable: true, type: 'timestamp'})
    rented_at: Date | null
    
    @ManyToOne(() => Users, u => u.games)
    user: Users | null
}