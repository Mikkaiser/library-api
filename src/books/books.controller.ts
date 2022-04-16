import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) : Promise<BookEntity> {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async findAll() : Promise<BookEntity[]> {
    return await this.booksService.findAll();
  }

}
