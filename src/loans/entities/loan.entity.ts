import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@src/users/entities/user.entity';

@Entity({ name: 'loans' })
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  amount: number;

  @Column({ default: 1 })
  interestRate: number;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.loans)
  user: User;
}
