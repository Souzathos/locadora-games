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

    @Column({nullable: false})
    deadline: Date

    @Column({nullable: true, default: false})
    rented: boolean

    @Column({nullable: true})
    rented_at: Date
    
    @ManyToOne(() => Users, u => u.games)
    user: Users
}