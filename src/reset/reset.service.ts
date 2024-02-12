import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetEnitity } from './reset.entity';
import { Repository } from 'typeorm';
import { Reset } from './reset.interface';

@Injectable()
export class ResetService {
constructor(
    @InjectRepository(ResetEnitity) private readonly resetRepository:Repository<ResetEnitity>
){

}
async create(reset:Reset):Promise<Reset>{

    return await this.resetRepository.save(reset);
}
async findOne(condition:object):Promise<Reset>{
    return await this.resetRepository.findOne({where:condition});
}


}
