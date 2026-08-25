import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Games } from "./Games";

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id:number

    @Column({length: 255, nullable: false})
    name: string

    @Column({nullable: false, length: 255, unique: true})
    email: string

    @Column({nullable: false, length: 255})
    password: string

    @Column({nullable: false, length: 255, unique: true})
    cpf: string

    @OneToMany(() => Games, g => g.user)
    games: Games
}