import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { UsersModule } from '@src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Loan]), UsersModule],
  controllers: [LoansController],
  providers: [LoansService],
  exports: [LoansService, TypeOrmModule],
})
export class LoansModule {}
