import { UserEntity } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('book')
export class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    author: string;

    @Column({ name: 'userId', nullable: true })
    userId?: string;

    @ManyToOne(() => UserEntity, (user) => user.books, { nullable: true })
    user?: UserEntity;

    //Inputing values to properties to unit tests
    constructor(book?: Partial<BookEntity>) {
        this.id = book?.id;
        this.name = book?.name;
        this.price = book?.price;
        this.author = book?.author;
        this.userId = book?.userId;
    }
    
}
