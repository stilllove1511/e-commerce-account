import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_RESPONSITORY')
        private userRepository: Repository<User>,
    ) {}

    async findOne(username: string) {
        return await this.userRepository.findOne({
            where: {
                username,
            },
            relations: ['role'],
        })
    }
}
