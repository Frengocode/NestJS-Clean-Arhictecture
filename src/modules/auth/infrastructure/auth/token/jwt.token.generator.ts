import { Payload } from "src/modules/auth/types/payload";
import { JwtService } from "@nestjs/jwt"
import { ITokenGenerator } from "src/modules/auth/interfaces/auth/itoken.generator";
import { Injectable } from "@nestjs/common";




@Injectable()
export class JwtTokenGenerator implements ITokenGenerator{
    constructor(
        public jwtService: JwtService
    ){}


    async generator(payload: Payload): Promise<string> {
        return await this.jwtService.signAsync(payload)
    }
}