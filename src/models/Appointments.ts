import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinColumn,  } from 'typeorm';

import User from './User'

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    barbeiro_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'barbeiro_id' })
    barbeiro: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;


}

export default Appointment;
