import { Entity,Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('password_reset')
export class ResetEnitity{
@PrimaryGeneratedColumn()
id:number;

@Column()
email:string;

@Column()
token:string;



}