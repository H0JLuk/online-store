import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from 'src/role/roles.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './models/type';
import { TypeService } from './type.service';

@ApiTags('type')
@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @ApiOperation({ summary: 'Creating type' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Type })
  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateTypeDto) {
    return this.typeService.create(dto);
  }

  @ApiOperation({ summary: 'Get all types' })
  @ApiResponse({ status: HttpStatus.OK, type: [Type] })
  @Get()
  getAll(): Promise<Type[]> {
    return this.typeService.getAll();
  }
}
