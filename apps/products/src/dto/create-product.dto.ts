import { ApiProperty } from "@nestjs/swagger/dist";
import { IsString } from "class-validator";
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsPositive()
    price: number;
}