import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { UserData } from './entities/user.entity';
import { UserPermission } from './entities/userPermission.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserData)
    private readonly userRepository: Repository<UserData>,
    @InjectRepository(UserPermission)
    private readonly userPermissionRepository: Repository<UserPermission>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(dto: CreateUserDto, id: number): Promise<UserData> {
    const hash = await argon.hash(dto.password);
    dto.password = hash;
    let userPermission = new UserPermission(dto.userPermission);
    if (userPermission.id) {
      userPermission = await this.findUserPermissionById(userPermission.id);
    }
    dto.userPermission = userPermission;
    dto.createdBy = id;
    dto.updatedBy = id;
    const newUser = new UserData(dto);
    const user = await this.entityManager.save(newUser);

    return user;
  }

  async findAll() {
    const user = await this.userRepository.find({
      relations: {
        userPermission: true,
      },
    });
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      relations: {
        userPermission: true,
      },
      where: {
        id: id,
      },
    });
    return user;
  }

  async findUserPermissionById(id: number): Promise<UserPermission> {
    const user = await this.userPermissionRepository.findOne({ where: { id } });
    if (!user) {
      throw new ForbiddenException('user not found');
    }
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
