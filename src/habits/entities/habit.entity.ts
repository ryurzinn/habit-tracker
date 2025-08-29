import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('habits')
export class Habit {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique:true
    })
    nombre: string;

    @Column('text', {
        nullable: true
    })
    descripcion?: string;

    @CreateDateColumn()
    fechaCreacion: Date;

    @Column('text', {
        nullable: true
    })
    frecuencia?: string;

    @Column('text', {
        nullable: true
    })
    categoria?: string;

}
