import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tracking-habits')
export class TrackingHabit {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    //TODO: Se llena automaticamente cuando se crea un habito nuevo
    @CreateDateColumn()
    createdDate: Date;

    //TODO: Setear automaticamente como completado
    @Column({ type: 'timestamptz', nullable: true })
    completedDate: Date | null;

    @Column('text', {
        nullable: true
    })
    notes?: string;

  

    

}
