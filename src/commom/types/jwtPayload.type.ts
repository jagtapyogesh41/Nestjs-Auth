import { UserPermission } from '../../user/entities/userPermission.entity';

export type JwtPayload = {
  sub: string;
  userHeadId?: number;
  permissions: UserPermission | any;
  id: number;
  secret: any;
  userName: string;
  ts: any;
  email?: string | null;
  tokenType: string;
};
