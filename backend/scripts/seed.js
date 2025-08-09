const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@baristapp.com' },
    update: {},
    create: {
      name: 'Guillermo',
      email: 'demo@baristapp.com',
      username: 'guilleg',
      password
    }
  });
  console.log('Usuario listo:', user.email);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
