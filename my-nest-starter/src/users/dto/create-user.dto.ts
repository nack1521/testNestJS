import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  readonly orderId: string;
}