import { BookEntity } from "src/books/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => BookEntity, (book) => book.user, { eager: true })
    books?: BookEntity[]
}
