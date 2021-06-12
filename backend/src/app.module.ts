import { Module } from '@nestjs/common';

import { AppConfigModule } from './app-config/app-config.module';
import { BasketModule } from './basket/basket.module';
import { BrandModule } from './brand/brand.module';
import { DeviceModule } from './device/device.module';
import { DeviceInfoModule } from './device-info/device-info.module';
import { RatingModule } from './rating/rating.module';
import { RoleModule } from './role/role.module';
import { TypeModule } from './type/type.module';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    BasketModule,
    BrandModule,
    DeviceModule,
    DeviceInfoModule,
    RatingModule,
    RoleModule,
    TypeModule,
    UserModule,
    FilesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
