import { Inject, Injectable } from '@nestjs/common'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { USER_RESPONSITORY } from 'src/common/constant/database-provider.constant'

//define hash password function
const salt = bcrypt.genSaltSync(10)
const hash = (password) => {
    return bcrypt.hashSync(password, salt)
}
@Injectable()
export class AccountService {
    constructor(
        @Inject(USER_RESPONSITORY)
        private userResponsitory: Repository<User>,
    ) {}

    async register(payload) {
        try {
            //check if usernae has been existed
            let isUsernameExist = await this.userResponsitory.findOneBy({
                username: payload.username,
            })
            if (isUsernameExist)
                return {
                    EC: 1,
                    EM: 'username has beeen existed',
                }

            payload.password = hash(payload.password)
            await this.userResponsitory.insert(payload)
            return {
                EC: 0,
                EM: 'create account succesfully',
            }
        } catch (error) {
            console.log(error)
            return {
                EC: 1,
                EM: 'some thing wrong in service',
            }
        }
    }

    async changePassword(payload) {
        try {
            //get user info
            let user = await this.userResponsitory.findOneOrFail({
                where: {
                    id: payload.userId,
                },
            })

            //check if old password from request and old password from database is the same
            let isCorrectPassword = bcrypt.compareSync(
                payload.oldPassword,
                user.password,
            )
            if (isCorrectPassword) {
                // then hash user new password and update to db
                user.password = hash(payload.newPassword)
                this.userResponsitory.save(user)
            } else {
                throw new Error('old password is not correct')
            }

            return {
                EC: 0,
                EM: 'change password successfully',
            }
        } catch (error) {
            console.log(error)
            return {
                EC: 1,
                EM: 'some thing wrong in service',
            }
        }
    }
}
