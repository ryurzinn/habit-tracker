import { User } from 'src/auth/entities/user.entity';
import { HabitCompletion } from 'src/tracking-habits/entities/habit-completion.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

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

    @ManyToOne(
    ( ) => User,
    (user) => user.habit,
    {eager: true}
   )
    user: User;

    @OneToMany(
    ( ) => HabitCompletion,
    (habitCompletion) => habitCompletion.habit,
   )
    habitCompletion: HabitCompletion[];


}
