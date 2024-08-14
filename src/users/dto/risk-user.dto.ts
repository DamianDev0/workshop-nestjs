import { IsNumber } from 'class-validator';

export class RiskUserDto {
  @IsNumber()
  creditScore: number;
}
