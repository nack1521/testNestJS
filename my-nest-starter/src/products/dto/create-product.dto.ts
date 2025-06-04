import { IsString, IsNumber, IsOptional, isString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    readonly name: string;
    @IsString()
    @IsOptional()
    readonly description?: string;
    @IsNumber()
    readonly price: number;
}
