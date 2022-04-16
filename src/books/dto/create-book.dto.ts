import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserEntity } from "src/users/entities/user.entity";

export class CreateBookDto {

    @IsNotEmpty({message: 'The Book must contains a name'})
    @IsString({ message: 'The name should be in a correct format' })
    readonly name: string;
    
    @IsNotEmpty({message: 'The Book must contains a price'})
    @IsNumber({}, { message: 'The price should be in a correct format' })
    readonly price: number;

    @IsString({ message: 'The author should be in a correct format' })
    @IsNotEmpty({message: 'The Book must contains a author'})
    readonly author: string;

    @IsOptional()
    readonly userId?: string;

}
