import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ChangePasswordAuthDto{
   
    @ApiProperty()
    @IsNotEmpty()
    oldpassword: string

    @ApiProperty()
    @IsNotEmpty()
    newpassword:string

    @ApiProperty()
    @IsNotEmpty()
    confirmpassword: string    
}