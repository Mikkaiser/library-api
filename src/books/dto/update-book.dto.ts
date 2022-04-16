import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {

    @IsOptional()
    @IsString({ message: 'The name should be in a correct format' })
    readonly name: string;
    
    @IsOptional()
    @IsNumber({}, { message: 'The price should be in a correct format' })
    readonly price: number;

    @IsOptional()
    @IsString({ message: 'The author should be in a correct format' })
    readonly author: string;

}
