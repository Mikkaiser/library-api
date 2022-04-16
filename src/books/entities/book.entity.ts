import { UserEntity } from "src/users/entities/user.entity";
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
    
}
