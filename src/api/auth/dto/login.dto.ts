import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator"

export class LoginDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNo: string

    @ApiProperty()
    @IsNotEmpty()
    password: string  
}