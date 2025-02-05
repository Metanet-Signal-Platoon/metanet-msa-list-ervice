// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstateModule } from './real-estate/real-estate.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 환경변수 사용을 위해 ConfigModule을 추가합니다.
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeORM 설정
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발 환경에서만 사용 (운영 환경에서는 migration 사용 권장)
    }),
    RealEstateModule,
  ],
})
export class AppModule {}