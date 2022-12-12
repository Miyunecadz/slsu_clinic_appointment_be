const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    create:  async (account) => {
        const response = await prisma.account.create({
            data: account
        })

        return response ? true : false;
    },

    find: async (condition) => {
        return await prisma.account.findFirst({
            where: condition
        })
    },

    delete: async (id) => {
        return await prisma.account.delete({
            where: {
                id: id
            }
        })
    }
}