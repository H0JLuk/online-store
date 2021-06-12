import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceInfoService } from './device-info.service';
import { DeviceInfo } from './models/deviceInfo';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceInfo])],
  providers: [DeviceInfoService],
})
export class DeviceInfoModule {}
