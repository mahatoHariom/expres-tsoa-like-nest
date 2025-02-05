import { inject } from 'inversify';
import { Prisma } from '@prisma/client';

import { provideSingleton } from '../../ioc/provide-singleton';
import { PrismaClientProvider } from '../../infrastructure/prisma/prisma-client-provider';

@provideSingleton(UserRepository)
export class UserRepository {
  constructor(@inject(PrismaClientProvider) private readonly prisma: PrismaClientProvider) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async getByEmail(email: string ) {
    return await this.prisma.user.findFirst({ where: { email, deletedAt: null } });
  }

  async getById({ id }: { id: number; teamId: string }) {
    return await this.prisma.user.findFirst({ where: { id, deletedAt: null } });
  }
}
