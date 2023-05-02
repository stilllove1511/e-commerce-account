import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    Unique,
    ManyToMany,
    JoinTable,
} from 'typeorm'

@Entity()
export class Role {
    @PrimaryColumn()
    code: string

    @Column()
    name: string

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable({ name: 'role_user' })
    users: User[]
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Unique(['username'])
    username: string

    @Column()
    password: string

    @ManyToMany(() => Role, (role) => role.users)
    roles: Role[]
}
