import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { User } from '../users/entities/user.entity';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createLoanDto: CreateLoanDto) {
    const { userId, ...loanData } = createLoanDto;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newLoan = this.loanRepository.create({
      ...loanData,
      user,
    });

    const savedLoan = await this.loanRepository.save(newLoan);

    return {
      ...savedLoan,
      user: {
        id: savedLoan.user.id,
        username: savedLoan.user.username,
        email: savedLoan.user.email,
      },
    };
  }

  async findAll() {
    const loans = await this.loanRepository.find({
      relations: ['user'],
    });

    return loans.map((loan) => ({
      ...loan,
      user: {
        userId: loan.user.id,
        username: loan.user.username,
        email: loan.user.email,
      },
    }));
  }

  async calculateLoanRisk(userId: number) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const creditPoints = user.creditScore;

    if (creditPoints > 800) {
      return 'low Risk';
    } else if (creditPoints > 600 && creditPoints <= 800) {
      return 'medium Risk';
    } else {
      return 'high Risk';
    }
  }
}
