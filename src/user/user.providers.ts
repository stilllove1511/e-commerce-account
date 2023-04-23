import {
    DATA_SOURCE,
    USER_RESPONSITORY,
} from 'src/common/constant/database-provider.constant'
import { DataSource } from 'typeorm'
import { User } from './user.entity'

export const userProviders = [
    {
        provide: USER_RESPONSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [DATA_SOURCE],
    },
]
