import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/role/roles.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { GetAllDevicesQueries } from './body/get-all';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './models/device';

@ApiTags('device')
@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('img'))
  create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateDeviceDto): Promise<Device> {
    return this.deviceService.create(dto, file);
  }

  @Get()
  getAll(@Query() queries: GetAllDevicesQueries): Promise<{ rows: Device[]; count: number }> {
    return this.deviceService.getAll(queries);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Device> {
    return this.deviceService.getById(id);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  delete(@Param('id') id: string) {
    return this.deviceService.delete(+id);
  }
}
