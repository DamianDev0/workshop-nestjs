import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsNumber()
  amount?: number;

  @IsNotEmpty()
  @IsNumber()
  interestRate?: number;

  @IsNotEmpty()
  @IsString()
  status?: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
