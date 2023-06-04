import { IsNumberString } from 'class-validator';

export class GetRandomDataDto {
  @IsNumberString()
  _start: string | undefined;

  @IsNumberString()
  _limit: string | undefined;
}
