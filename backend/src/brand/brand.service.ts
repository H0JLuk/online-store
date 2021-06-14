import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './models/brand';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
  ) {}

  async create(dto: CreateBrandDto): Promise<Brand> {
    try {
      const { name, types } = dto;
      const brand = await this.brandsRepository.save({ name, types: this.formatJoinData(types) });
      return brand;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Duplicate data', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(typeId: number): Promise<Brand[]> {
    let brands;

    if (Number.isNaN(typeId)) {
      brands = await this.brandsRepository.find();
    } else {
      const query = this.brandsRepository
        .createQueryBuilder('brand')
        .leftJoin('brand.types', 'type')
        .where('type.id = :typeId', { typeId });
      brands = await query.getMany();
    }

    return brands;
  }

  private formatJoinData(ids: number[]): { id: number }[] {
    return ids.map((id) => ({ id }));
  }
}
