import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './models/type';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private typesRepository: Repository<Type>,
  ) {}

  async create(dto: CreateTypeDto): Promise<Type> {
    try {
      const { name } = dto;
      const type = await this.typesRepository.save({ name });
      return type;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Duplicate data', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(): Promise<Type[]> {
    const types = await this.typesRepository.find();
    return types;
  }
}
