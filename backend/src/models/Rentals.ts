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

    @CreateDateColumn({ type: 'timestamp' })
    rented_at: Date

    @Column({ nullable: false, type: 'timestamp' })
    due_date: Date

    @Column({ nullable: true, type: 'timestamp' })
    returned_at: Date | null

    @Column({ nullable: false, type: 'decimal' })
    price_paid: number
}
