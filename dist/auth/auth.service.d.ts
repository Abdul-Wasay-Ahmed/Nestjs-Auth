import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { User } from './models/user.interface';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(user: User): Promise<User>;
    findOneBy(condition: object): Promise<User>;
    update(id: number, data: any): Promise<any>;
}
