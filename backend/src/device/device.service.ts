import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceInfo } from 'src/device-info/models/deviceInfo';
import { FilesService } from 'src/files/files.service';
import { FindManyOptions, Repository, DeleteResult } from 'typeorm';
import { GetAllDevicesQueries } from './body/get-all';

import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './models/device';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
    @InjectRepository(DeviceInfo)
    private devicesInfoRepository: Repository<DeviceInfo>,
    private filesService: FilesService,
  ) {}

  async create(dto: CreateDeviceDto, file: Express.Multer.File): Promise<any> {
    try {
      const { name, price, brandId, typeId, deviceInfo } = dto;
      const fileName = this.filesService.createFile(file);

      const device = await this.devicesRepository.save({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (deviceInfo) {
        deviceInfo.forEach((i) =>
          this.devicesInfoRepository.save({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          }),
        );
      }
      return device;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Duplicate data', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string): Promise<Device> {
    const device = await this.devicesRepository.findOne(id, {
      relations: ['devicesInfo', 'type', 'brand'],
    });
    return device;
  }

  async getAll(queries: GetAllDevicesQueries): Promise<Device[]> {
    const { limit = 9, page = 1, brandId, typeId } = queries;
    const offset = (page - 1) * limit;
    const where: FindManyOptions<Device>['where'] = {};

    brandId && (where.brandId = brandId);
    typeId && (where.typeId = typeId);

    const devices = await this.devicesRepository.find({
      where,
      skip: offset,
      take: limit,
      relations: ['devicesInfo', 'brand', 'type'],
    });
    return devices;
  }

  async delete(id: number) {
    const { affected }: DeleteResult = await this.devicesRepository.delete(id);

    // TODO: Delete deviceInfo

    if (!affected) {
      throw new HttpException('Cannot find device with id', HttpStatus.BAD_REQUEST);
    }

    return;
  }
}
