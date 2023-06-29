import execa from 'execa'

export const getPrismaClientDmmf = (packagePath: string) => {
  let dmmf: any = undefined

  try {
    const { stdout } = execa.sync('node', [__dirname + '/generate.js'], {
      cwd: process.cwd(),
    })
    dmmf = JSON.parse(stdout)
  } catch {}

  if (!dmmf) {
    try {
      const prismaClient = require(packagePath)
      dmmf = prismaClient.dmmf || prismaClient.Prisma.dmmf
    } catch (error) {
      throw new Error(
        `Failed to import prisma client package at ${packagePath}. The following error occured while trying:`
      )
    }
  }

  if (!dmmf) {
    throw new Error(`\
You most likely forgot to initialize the Prisma Client. Please run \`prisma generate\` and try to run it again.
If that does not solve your problem, please open an issue.`)
  }

  return dmmf
}
