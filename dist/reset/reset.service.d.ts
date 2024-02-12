import { ResetEnitity } from './reset.entity';
import { Repository } from 'typeorm';
import { Reset } from './reset.interface';
export declare class ResetService {
    private readonly resetRepository;
    constructor(resetRepository: Repository<ResetEnitity>);
    create(reset: Reset): Promise<Reset>;
    findOne(condition: object): Promise<Reset>;
}
