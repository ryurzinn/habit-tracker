import { User } from "src/auth/entities/user.entity";
import { Habit } from "src/habits/entities/habit.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('habitCompletion')
export class HabitCompletion {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    //TODO: Setear automaticamente como completado
    @Column({ type: 'timestamptz', nullable: true })
    completedDate: Date | null;

    @Column('text', {
        nullable: true
    })
    notes?: string;

    
    @ManyToOne(
    ( ) => User,
    (user) => user.habitCompletion,
    {eager: true}
   )
    user: User;


    @ManyToOne(
    ( ) => Habit,
    (habit) => habit.habitCompletion,
    {eager: true}
   )
    habit: Habit;
    

}
