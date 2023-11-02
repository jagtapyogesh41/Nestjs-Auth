import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Boiler } from './entities/boiler.entity';
import { CreateBoilerDto } from './dto/create-boiler.dto';
import { RequestDate } from 'src/commom/dto/response.dto';

@Injectable()
export class BoilerService {
  constructor(
    @InjectRepository(Boiler)
    private readonly boilerRepository: Repository<Boiler>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(boilerData: CreateBoilerDto): Promise<Boiler> {
    const newBoiler = this.boilerRepository.create(boilerData);
    return await this.boilerRepository.save(newBoiler);
  }

  async findAll(): Promise<Boiler[]> {
    return this.boilerRepository.find();
  }

  async findByDate(dates: RequestDate): Promise<any> {
    const { startDate, endDate } = dates;
    return await this.boilerRepository
      .createQueryBuilder('boiler')
      .where('boiler.createdDate >= :startDate', { startDate })
      .where('boiler.createdDate <= :endDate', { endDate })
      .getMany();
  }

  async findById(id: number): Promise<Boiler | undefined> {
    return await this.boilerRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    boilerData: Partial<Boiler>,
  ): Promise<Boiler | undefined> {
    await this.boilerRepository.update(id, boilerData);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.boilerRepository.delete(id);
  }
}
