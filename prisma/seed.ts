import { prisma } from '../src/lib/prisma';

async function main() {
  // Seed demo user
  await prisma.user.create({
    data: {
      email: 'demo@example.com',
      password: 'password',
      name: 'Demo User',
    },
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
