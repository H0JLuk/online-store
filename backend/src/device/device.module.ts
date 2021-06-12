import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { Device } from './models/device';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { DeviceInfo } from 'src/device-info/models/deviceInfo';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Device, DeviceInfo]), FilesModule, AuthModule],
  providers: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
