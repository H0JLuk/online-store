import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetAllBrandsQueries } from './dto/get-all-brands';
import { Brand } from './models/brand';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
  ) {}

  async create(dto: CreateBrandDto): Promise<Brand> {
    try {
      const { name } = dto;
      const brand = await this.brandsRepository.save({ name });
      return brand;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Duplicate data', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(queries: GetAllBrandsQueries): Promise<Brand[]> {
    const where: FindManyOptions<Brand>['where'] = {};
    const { page, limit, typeId } = queries;

    typeId && (where.types = [typeId]);

    const brands = await this.brandsRepository.find({ where: { types } });
    return brands;
  }
}
