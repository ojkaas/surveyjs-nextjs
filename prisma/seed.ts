import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'olaf@ojkaas.nl' },
    update: {},
    create: {
      email: 'olaf@ojkaas.nl',
      name: 'Olaf van der Kaa',
      role: 'ADMIN',
    },
  })
  const portal = await prisma.user.upsert({
    where: { email: 'arts@ojkaas.nl' },
    update: {},
    create: {
      email: 'arts@ojkaas.nl',
      name: 'Olaf van der Kaa',
      role: 'PORTAL',
    },
  })
  /*
  const admin = await prisma.user.create({
    data: {
      email: 'olaf@ojkaas.nl',
      name: 'Olaf van der Kaa',
      role: 'ADMIN',
    },
  })
  const portal = await prisma.user.create({
    data: {
      email: 'arts@ojkaas.nl',
      name: 'Olaf van der Kaa',
      role: 'PORTAL',
    },
  })*/
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
