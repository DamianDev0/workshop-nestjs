import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard'; // Ajusta la ruta según la ubicación real de tu guard
import { LoansService } from '@src/loans/loans.service';
import { CreateLoanDto } from '@src/loans/dto/create-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLoanDto: CreateLoanDto) {
    try {
      const newLoan = await this.loansService.create(createLoanDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Loan created successfully',
        data: newLoan,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Error creating loan',
      };
    }
  }
}
