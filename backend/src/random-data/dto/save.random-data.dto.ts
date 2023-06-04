import { IsNotEmptyObject, ValidateNested } from 'class-validator';

export class SaveRandomDataDto {
  @ValidateNested()
  @IsNotEmptyObject()
  save!: { [key: string]: string };
}
