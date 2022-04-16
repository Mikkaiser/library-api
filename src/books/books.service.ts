import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>
  ) {}

  async create(createBookDto: CreateBookDto) : Promise<BookEntity> {
    return await this.bookRepository.save(createBookDto);
  }

  async findAll() : Promise<BookEntity[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: string) : Promise<BookEntity> {
    const book = await this.bookRepository.findOneBy({ id });

    if(!book)
      throw new NotFoundException('Book not found');

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) : Promise<BookEntity> {

    const book = await this.findOne(id);

    Object.assign(book, updateBookDto);
      
    return await this.bookRepository.save(book);
  }

  async delete(id: string) : Promise<{deleted: Boolean}>{

    //Verify if id exists
    await this.findOne(id);

    this.bookRepository.delete(id);
    return { deleted: true };
  }
}
