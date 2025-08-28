import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('habits')
export class Habit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({nullable: true})
    descripcion?: string;

    @CreateDateColumn()
    fechaCreacion: Date;

}
