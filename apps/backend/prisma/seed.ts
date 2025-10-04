/// <reference types="node" />

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@creativecluster.ru' },
    update: {},
    create: {
      email: 'admin@creativecluster.ru',
      username: 'admin',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  const userPassword = await bcrypt.hash('user123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      username: 'testuser',
      passwordHash: userPassword,
      firstName: 'Test',
      lastName: 'User',
      role: 'CUSTOMER',
    },
  });

  console.log('✅ Test user created:', user.email);
}

main()
  .catch(e => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
