import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";



export class LoginDTO{

    @ApiProperty({
        title: "accessToken",
        description: "Generated Access Token",
        type: "string",
        example: "e994299339JFJ...."
    })
    @IsString()
    public accessToken: string

    @ApiProperty({
        title: "type",
        description: "Generates token type",
        type: "string",
        example: "bearer"
    })
    @IsString()
    public type?: string


    static mapper(accessToken: string, type?: string): LoginDTO{
        return Object.assign(new LoginDTO(), {
            accessToken: accessToken,
            type: type ?? "Bearer"
        })
    }

}