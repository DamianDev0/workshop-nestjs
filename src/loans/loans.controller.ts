import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';

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
        message: 'loan created successfully',
        data: newLoan,
      };
    } catch (error) {
      throw new Error('Error creating loan');
    }
  }

  @Get()
  async findAll() {
    return await this.loansService.findAll();
  }

  @Get('calculate-risk/:userId')
  async calculateLoanRisk(@Param('userId') userId: number) {
    try {
      const risk = await this.loansService.calculateLoanRisk(userId);
      return {
        status: HttpStatus.OK,
        message: 'Loan risk calculated successfully',
        data: risk,
      };
    } catch (error) {
      throw new BadRequestException('Error calculating loan risk');
    }
  }
}
