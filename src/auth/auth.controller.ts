import { BadRequestException,Res,Req, Body,Controller, Get,Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';

import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import {Response, Request} from "express";
import { AuthInterceptor } from './auth.interceptor';
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
    constructor(
        private authService:AuthService,
        private jwtService: JwtService
    ){

    }
    @Post('register')
    async register(@Body() body:RegisterDto){

        const userExists = await this.authService.findOneBy({email:body.email})
        if(userExists){
            throw new BadRequestException("User Already Exists")
        }
        

        if(body.password !== body.password_confirm){
    throw new BadRequestException('Password do not match')
}



body.password = await bcrypt.hash(body.password, 12);
         
        return this.authService.create(body);
        

    }

@Post('login')
async login(

    @Body('email') email:string,
    @Body('password') password:string,
    @Res({passthrough:true}) response:Response
){
const user = await this.authService.findOneBy({email})
if(!user){
    throw new BadRequestException("Email does'nt exists")
}

if(!await bcrypt.compare(password, user.password)){
    throw new BadRequestException("Invalid Credentials")
}

const jwt = await this.jwtService.signAsync({id:user.id})
response.cookie('jwt',jwt,{httpOnly:true})
return {
    user
}


}

@UseInterceptors(AuthInterceptor)
@Get('user')
async user(@Req() request:Request){
const cookie = request.cookies['jwt']
const data = await this.jwtService.verifyAsync(cookie);
const user = await this.authService.findOneBy({id:data['id']})

return user

}

@UseInterceptors(AuthInterceptor)
@Post('logout')
async logout(
    @Res({passthrough:true}) response:Response
){
response.clearCookie('jwt')

return {
    message:"User Logged Out"
}

}



}

