import {prisma} from '../prisma-client'

async function createRoles(){
  const adminRole = await prisma.role.upsert({
    create: {
      type: "Admin",
      description: "special access"
    },
    update: {
      type: "Admin",
      description: "special access"
    },
    where: {id: 1}
  })
  const employeeRole = await prisma.role.upsert({
    create: {
      type: "Employee",
      description: "access for sales operations"
    },
    update: {},
    where: {id: 2}
  })
}
createRoles()