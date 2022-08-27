import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {IsOptional, IsString } from "class-validator";

export class Filter {

    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search: string;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    locationId: string;

    @ApiProperty({default: 1})
    @IsString()
    page: number;

    @ApiProperty({default: 15})
    @ApiPropertyOptional()
    @IsOptional()
    limit: number;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsOptional()
    fromDate: Date;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsOptional()
    toDate: Date;
}