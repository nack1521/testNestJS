import { IsString, IsNumber, IsOptional, isString } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    readonly name?: string;
    @IsString()
    @IsOptional()
    readonly description?: string;
    @IsNumber()
    @IsOptional()
    readonly price?: number;
}
