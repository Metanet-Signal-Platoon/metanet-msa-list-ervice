// src/real-estate/real-estate.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstate } from './real-estate.entity';
import { RealEstateService } from './real-estate.service';
import { RealEstateController } from './real-estate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RealEstate])],
  providers: [RealEstateService],
  controllers: [RealEstateController],
})
export class RealEstateModule {}