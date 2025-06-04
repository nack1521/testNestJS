import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly name?: string;
    @IsString()
    @IsMongoId()
    @IsOptional()
    readonly orderId?: string;
}