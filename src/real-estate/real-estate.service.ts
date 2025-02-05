// src/real-estate/real-estate.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RealEstate } from './real-estate.entity';

@Injectable()
export class RealEstateService {
  constructor(
    @InjectRepository(RealEstate)
    private realEstateRepository: Repository<RealEstate>,
  ) {}

  async findAll(): Promise<RealEstate[]> {
    return this.realEstateRepository.find({
      select: ['price', 'additionalInfo', 'location', 'brokerName', 'phoneNumber'],
    });
  }
}