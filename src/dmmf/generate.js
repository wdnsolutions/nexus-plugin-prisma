const SDK = require('@prisma/internals')
const resolve = require('resolve')

const datamodelPath = resolve.sync('.prisma/client/schema.prisma', {
  basedir: process.cwd(),
})

SDK.getDMMF({
  datamodelPath,
}).then((dmmf) => console.log(JSON.stringify(dmmf)))
