// src/real-estate/real-estate.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'real_estate' })
export class RealEstate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: '부동산 가격' })
  price: number;

  @Column({ type: 'varchar', length: 255, comment: '부동산 부가정보' })
  additionalInfo: string;

  @Column({ type: 'varchar', length: 255, comment: '부동산 위치' })
  location: string;

  @Column({ type: 'varchar', length: 100, comment: '공인중개사 이름' })
  brokerName: string;

  @Column({ type: 'varchar', length: 50, comment: '전화번호' })
  phoneNumber: string;
}