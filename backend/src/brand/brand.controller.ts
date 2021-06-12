import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/role/roles.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetAllBrandsQueries } from './dto/get-all-brands'
import { Brand } from './models/brand';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @ApiOperation({ summary: 'Creating brand' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Brand })
  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateBrandDto): Promise<Brand> {
    return this.brandService.create(dto);
  }

  @ApiOperation({ summary: 'Getting all brands' })
  @ApiResponse({ status: HttpStatus.OK, type: [Brand] })
  @Get()
  getAll(@Query() queries: GetAllBrandsQueries): Promise<Brand[]> {
    return this.brandService.getAll(queries);
  }
}
