// src/real-estate/real-estate.controller.ts
import { Controller, Get } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { RealEstate } from './real-estate.entity';

@Controller('real-estates')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Get()
  async getRealEstates(): Promise<RealEstate[]> {
    return this.realEstateService.findAll();
  }
}