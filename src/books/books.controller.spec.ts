import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookEntity } from './entities/book.entity';

describe('BooksController', () => {

  //Here, the jest is modularizing the unit test.
  //To ensure that one test will not interfere another

  let booksController: BooksController;
  let booksService: BooksService;

  const booksList : BookEntity[] = [
    new BookEntity({ id: '1', name: 'Livro 1', price: 200, author: 'Jest JS' }),
    new BookEntity({ id: '2', name: 'Livro 2', price: 300, author: 'Jest JS' }),
    new BookEntity({ id: '3', name: 'Livro 3', price: 400, author: 'Jest JS' }),
  ];

  const newBook = new BookEntity({ name: 'Book One', price: 100, author:'Jest JS' });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue : {
            create: jest.fn().mockResolvedValue(newBook),
            findAll: jest.fn().mockResolvedValue(booksList),
          }
        }
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  //The 'test'
  it('should be defined', () => {
    expect(booksController).toBeDefined();
    expect(booksService).toBeDefined();
  });

  describe('findAll',() => {
    it('should return a list of books successfully', async () => {
      //Arrange
      const result = await booksController.findAll();

      //Assert
      expect(result).toEqual(booksList);
      expect(typeof booksList).toEqual('object');
      expect(booksService.findAll).toHaveBeenCalledTimes(1);
    });


    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(booksService, 'findAll').mockRejectedValueOnce(new Error());

      //Assert
      expect(booksController.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new book successfully', async () => {
      //Arrange
      const body: CreateBookDto = {
        name: 'Book One',
        price: 300,
        author: 'Jest JS'
      }

      //Act
      const result = await booksController.create(body);


      //Assert
      expect(result).toEqual(newBook);
      expect(booksService.create).toHaveBeenCalledWith(body);

    });

    it('should return a exception', () => {
      //Arrange
      const body: CreateBookDto = {
        name: 'Book One',
        price: 300,
        author: 'Jest JS'
      }

      jest.spyOn(booksController, 'create').mockRejectedValueOnce(new Error());


      //Assert
      expect(booksController.create(body)).rejects.toThrowError();

    });
  });
});
