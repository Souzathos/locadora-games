import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";
import { Games } from "./Games";

@Entity('rentals')
export class Rentals {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Games, { nullable: false })
    game: Games

    @ManyToOne(() => Users, { nullable: false })
    user: Users

    @CreateDateColumn()
    rented_at: Date

    @Column({ nullable: false })
    due_date: Date

    @Column({ nullable: true, type: 'datetime' })
    returned_at: Date | null

    @Column({ nullable: false, type: 'decimal' })
    price_paid: number
}
