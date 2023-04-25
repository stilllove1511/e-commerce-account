import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    PrimaryColumn,
    Unique,
} from 'typeorm'

@Entity()
export class Role {
    @PrimaryColumn()
    code: string

    @Column()
    name: string

    @OneToMany(() => User, (user) => user.role)
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

    @ManyToOne(() => Role, (role) => role.users)
    role: Role
}
