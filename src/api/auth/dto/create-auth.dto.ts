import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateAuthDto{
   
    @ApiProperty()
    @IsNotEmpty()
    regCode: string

    @ApiProperty()
    @IsNotEmpty()
    fullname: string

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNo:string

    @ApiProperty()
    @IsNotEmpty()
    password: string   

    @ApiProperty()
    @IsNotEmpty()
    confirmpassword: string 
}