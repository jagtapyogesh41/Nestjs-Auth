import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
//decorators
import { Tokens, JwtPayload } from '../commom/types';
//class
import { UserData } from '../user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInUser } from './dto/create-login.dto';
import { CryptoService } from './crypto-js.service';
import { UserService } from 'src/user/user.service';
import { MappingService } from './permission-map.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserData)
    private readonly userRepository: Repository<UserData>,
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
    private readonly config: ConfigService,
    private readonly mappingService: MappingService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async signup(dto: CreateUserDto, id: number): Promise<Tokens> {
    const user = await this.userService.create(dto, id);
    const tokens = await this.getTokens(user);
    this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(id: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    const user = await this.userRepository.findOneBy({ id });
    user.hashedRt = hash;
    await this.entityManager.save(user);
  }

  async getTokens(user: UserData): Promise<Tokens> {
    const date = Date.now();
    const key = await this.cryptoService.encrypt(`${user.id}${date}`);
    const jwtPayload: JwtPayload = {
      sub: `${user.id}`,
      userHeadId: user.id,
      permissions: user.userPermission,
      id: user.id,
      userName: user.userName,
      ts: date,
      email: 'string',
      secret: key,
      tokenType: 'accessToken',
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signinLocal(dto: SignInUser): Promise<Tokens> {
    const user = await this.userRepository.findOne({
      relations: {
        userPermission: true,
      },
      where: {
        userName: dto.userName,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async checkPermissions(req: any, section: any): Promise<boolean> {
    const searchStrings = ['all', 'list', 'page'];
    const method = req.method;
    const url = req.originalUrl;
    const map = this.mappingService.getKeyByValue(section);
    console.log(map);
    const permission = req['user'].permissions[map];
    console.log(permission);
    if (!permission) {
      if (
        method === 'GET' ||
        (method === 'POST' &&
          searchStrings.some((searchString) => url.includes(searchString)))
      ) {
        return true;
      }
      throw new ForbiddenException(`User don't have the required permissions`);
    }

    const result = permission.toString(2);
    const permissionCheck = (pos: number) => result.charAt(pos) === '1';

    switch (method) {
      case 'GET':
        return true;
      case 'POST':
        if (
          searchStrings.some((searchString) => url.includes(searchString)) ||
          permissionCheck(1)
        ) {
          return true;
        }
        break;
      case 'PUT':
      case 'PATCH':
        if (permissionCheck(2) || permissionCheck(5)) {
          return true;
        }
        break;
      case 'DELETE':
        if (permissionCheck(3) || permissionCheck(6)) {
          return true;
        }
        break;
    }

    return false;
  }

  // async checkPermissions(req: any, section: any): Promise<boolean> {
  //   const searchStrings = ['all', 'list', 'page'];
  //   const method = req.method;
  //   const url = req.originalUrl;
  //   const map = this.mappingService.getKeyByValue(section);
  //   const permission = req['user'].permissions[map];

  //   if (!permission) {
  //     if (method === 'GET') {
  //       return true;
  //     }
  //     if (method === 'POST') {
  //       for (const searchString of searchStrings) {
  //         if (url.includes(searchString)) {
  //           return true;
  //         }
  //       }
  //     }
  //     throw new ForbiddenException(`User don't have the required permissions`);
  //   }
  //   const result = permission.toString(2);

  //   if (method === 'GET') {
  //     return true;
  //   }
  //   if (method === 'POST') {
  //     for (const searchString of searchStrings) {
  //       if (url.includes(searchString)) {
  //         return true;
  //       }
  //     }
  //     if (result.charAt(1) === '1') {
  //       return true;
  //     }
  //     return false;
  //   }
  //   if (method === 'PUT' || method === 'PATCH') {
  //     if (result.charAt(2) === '1' || result.charAt(5) === '1') {
  //       return true;
  //     }
  //     return false;
  //   }
  //   if (method === 'DELETE') {
  //     if (result.charAt(3) === '1' || result.charAt(6) === '1') {
  //       return true;
  //     }
  //     return false;
  //   }

  //   return true;
  // }
}
