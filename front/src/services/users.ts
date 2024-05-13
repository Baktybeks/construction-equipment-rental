import { prisma } from '@/lib/prisma';


export function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export function getAllUser() {
  return prisma.user.findMany();
}
